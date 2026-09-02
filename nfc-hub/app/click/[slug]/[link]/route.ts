import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../../lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteContext = {
  params: Promise<{
    slug: string;
    link: string;
  }>;
};

const allowedLinks = new Set([
  "google",
  "instagram",
  "konum",
  "telefon",
]);

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { slug, link } =
    await context.params;

  const normalizedSlug =
    slug.trim().toLowerCase();

  const normalizedLink =
    link.trim().toLowerCase();

  if (
    !normalizedSlug ||
    !allowedLinks.has(
      normalizedLink
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Geçersiz bağlantı.",
      },
      {
        status: 400,
      }
    );
  }

  const supabase =
    createAdminClient();

  /* =========================
     İŞLETMEYİ BUL
  ========================= */

  const {
    data: business,
    error: businessError,
  } = await supabase
    .from("businesses")
    .select(`
      name,
      slug,
      google_url,
      instagram_url,
      maps_url,
      phone,
      active,
      status
    `)
    .eq(
      "slug",
      normalizedSlug
    )
    .maybeSingle();

  if (
    businessError ||
    !business
  ) {
    return NextResponse.json(
      {
        error:
          "İşletme bulunamadı.",
      },
      {
        status: 404,
      }
    );
  }

  const isBusinessActive =
    business.active === true &&
    business.status !==
      "passive" &&
    business.status !==
      "archived";

  if (!isBusinessActive) {
    return NextResponse.json(
      {
        error:
          "İşletme aktif değil.",
      },
      {
        status: 403,
      }
    );
  }

  /* =========================
     HEDEFİ BELİRLE
  ========================= */

  let destination:
    | string
    | null = null;

  switch (normalizedLink) {
    case "google":
      destination =
        business.google_url;
      break;

    case "instagram":
      destination =
        business.instagram_url;
      break;

    case "konum":
      destination =
        business.maps_url;
      break;

    case "telefon": {
      const phone =
        business.phone?.replace(
          /[^0-9+]/g,
          ""
        );

      destination = phone
        ? `tel:${phone}`
        : null;

      break;
    }
  }

  if (!destination) {
    return NextResponse.json(
      {
        error:
          "Bu bağlantı tanımlanmamış.",
      },
      {
        status: 404,
      }
    );
  }

  /*
    Google, Instagram ve
    konum için sadece güvenli
    web adreslerine izin ver.
  */

  if (
    normalizedLink !==
    "telefon"
  ) {
    try {
      const destinationUrl =
        new URL(destination);

      if (
        destinationUrl.protocol !==
        "https:"
      ) {
        throw new Error(
          "HTTPS gerekli."
        );
      }
    } catch {
      return NextResponse.json(
        {
          error:
            "Geçersiz hedef adresi.",
        },
        {
          status: 500,
        }
      );
    }
  }

  /* =========================
     KART KODUNU KONTROL ET
  ========================= */

  const rawCard =
    request.nextUrl.searchParams.get(
      "card"
    );

  let cardCode:
    | string
    | null = null;

  if (rawCard) {
    const normalizedCard =
      rawCard
        .trim()
        .toUpperCase();

    const {
      data: cardRoute,
      error: cardError,
    } = await supabase
      .from("nfc_routes")
      .select(
        "code, business, active"
      )
      .eq(
        "code",
        normalizedCard
      )
      .maybeSingle();

    if (
      cardError ||
      !cardRoute ||
      cardRoute.business !==
        business.name ||
      !cardRoute.active
    ) {
      return NextResponse.json(
        {
          error:
            "Geçersiz NFC kartı.",
        },
        {
          status: 400,
        }
      );
    }

    cardCode =
      normalizedCard;
  }

  /* =========================
     SAYAÇ VERSİYONU
  ========================= */

  const {
    data: settings,
  } = await supabase
    .from("counter_settings")
    .select(
      "counter_version"
    )
    .eq(
      "business",
      business.name
    )
    .maybeSingle();

  const counterVersion =
    settings?.counter_version ??
    1;

  /* =========================
     ZİYARETÇİ ID
  ========================= */

  let visitorId =
    request.cookies.get(
      "hub_visitor_id"
    )?.value;

  let shouldSetCookie =
    false;

  if (!visitorId) {
    visitorId =
      crypto.randomUUID();

    shouldSetCookie =
      true;
  }

  /*
    Mevcut unique index ile
    uyumlu olması için kart
    kodunu visitor_id içine de
    ekliyoruz.

    TES01 ve TES02 birbirinden
    bağımsız sayılır.
  */

  const databaseVisitorId =
    `${visitorId}_${cardCode ?? "WEB"}`;

  /* =========================
     TIKLAMAYI KAYDET
  ========================= */

  const {
    error: clickError,
  } = await supabase
    .from("link_clicks")
    .insert({
      business:
        business.name,

      visitor_id:
        databaseVisitorId,

      link_name:
        normalizedLink,

      counter_version:
        counterVersion,

      card_code:
        cardCode,
    });

  /*
    23505:
    aynı ziyaretçi,
    aynı kart,
    aynı buton,
    aynı sayaç dönemi.

    İkinci kez saymıyoruz.
  */

  if (
    clickError &&
    clickError.code !== "23505"
  ) {
    console.error(
      "Tıklama kaydedilemedi:",
      clickError
    );
  }

  /* =========================
     GERÇEK HEDEFE GİT
  ========================= */

  const response =
    new NextResponse(
      null,
      {
        status: 302,

        headers: {
          Location:
            destination,

          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );

  if (shouldSetCookie) {
    response.cookies.set(
      "hub_visitor_id",
      visitorId,
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge:
          60 *
          60 *
          24 *
          365,
      }
    );
  }

  return response;
}