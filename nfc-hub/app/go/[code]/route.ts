import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteContext = {
  params: Promise<{
    code: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { code } = await context.params;

  const normalizedCode = code
    .trim()
    .toUpperCase();

  if (!normalizedCode) {
    return NextResponse.json(
      {
        error: "Geçersiz kart kodu.",
      },
      {
        status: 400,
      }
    );
  }

  const supabase =
    createAdminClient();

  /* =========================
     NFC ROUTE'U BUL
  ========================= */

  const {
    data: route,
    error: routeError,
  } = await supabase
    .from("nfc_routes")
    .select(
      `
      code,
      business,
      destination_url,
      active
      `
    )
    .eq("code", normalizedCode)
    .maybeSingle();

  if (
    routeError ||
    !route
  ) {
    console.error(
      "NFC route bulunamadı:",
      routeError
    );

    return NextResponse.json(
      {
        error:
          "NFC kartı bulunamadı.",
      },
      {
        status: 404,
      }
    );
  }

  if (!route.active) {
    return NextResponse.json(
      {
        error:
          "Bu NFC kartı aktif değil.",
      },
      {
        status: 403,
      }
    );
  }

  /* =========================
     HEDEF URL KONTROLÜ
  ========================= */

  let destination: URL;

  try {
    destination =
      new URL(
        route.destination_url
      );
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

  if (
    destination.protocol !==
    "https:"
  ) {
    return NextResponse.json(
      {
        error:
          "Güvensiz hedef adresi.",
      },
      {
        status: 500,
      }
    );
  }

  /*
    SADECE MERKEZİ YENİ
    İŞLETMELERİ BURADA SAY.

    Örneğin:

    nfc-hub.../business/test-cafe

    Container gibi eski
    projeler kendi /go
    sayaçlarını kullanmaya
    devam eder.
  */

  const currentOrigin =
    new URL(request.url).origin;

  const isCentralBusiness =
    destination.origin ===
      currentOrigin &&
    destination.pathname.startsWith(
      "/business/"
    );

  /* =========================
     ZİYARET SAYACI
  ========================= */

  let newVisitorId:
    | string
    | null = null;

  if (isCentralBusiness) {
    try {
      /*
        İŞLETMENİN MEVCUT
        SAYAÇ VERSİYONUNU AL
      */

      const {
        data: counterSettings,
      } = await supabase
        .from(
          "counter_settings"
        )
        .select(
          "counter_version"
        )
        .eq(
          "business",
          route.business
        )
        .maybeSingle();

      const counterVersion =
        counterSettings
          ?.counter_version ?? 1;

      /*
        TARAYICIYA SABİT
        BİR ZİYARETÇİ ID'Sİ
      */

      let visitorId =
        request.cookies.get(
          "hub_visitor_id"
        )?.value;

      if (!visitorId) {
        visitorId =
          crypto.randomUUID();

        newVisitorId =
          visitorId;
      }

      /*
        AYNI TARAYICI +
        AYNI KART +
        AYNI SAYAÇ DÖNEMİ

        yalnızca 1 ziyaret
        sayılır.
      */

      const uniqueVisitorKey =
        `${visitorId}_${normalizedCode}_v${counterVersion}`;

      const {
        error: visitError,
      } = await supabase
        .from("visits")
        .insert({
          business:
            route.business,

          visitor_id:
            uniqueVisitorKey,

          counter_version:
            counterVersion,

          card_code:
            normalizedCode,
        });

      /*
        23505 =
        bu ziyaret daha önce
        sayılmış.

        Hata olarak kabul
        etmiyoruz.
      */

      if (
        visitError &&
        visitError.code !==
          "23505"
      ) {
        console.error(
          "Ziyaret kaydedilemedi:",
          visitError
        );
      }
    } catch (error) {
      /*
        Sayaçta hata olsa bile
        NFC yönlendirmesini
        bozmuyoruz.
      */

      console.error(
        "Merkezi ziyaret sayacı hatası:",
        error
      );
    }
  }

  /* =========================
     YÖNLENDİRME
  ========================= */

  const response =
    NextResponse.redirect(
      destination,
      307
    );

  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  response.headers.set(
    "Pragma",
    "no-cache"
  );

  response.headers.set(
    "Expires",
    "0"
  );

  /*
    Yeni ziyaretçi ise
    tarayıcıda ID sakla.
  */

  if (newVisitorId) {
    response.cookies.set(
      "hub_visitor_id",
      newVisitorId,
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