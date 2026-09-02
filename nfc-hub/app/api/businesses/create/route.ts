import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../../lib/supabase-admin";

import {
  verifyAdminSessionToken,
} from "../../../../lib/admin-session";

export const dynamic = "force-dynamic";

function makePrefix(slug: string) {
  const cleaned = slug
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  if (cleaned.length >= 3) {
    return cleaned.slice(0, 3);
  }

  return cleaned.padEnd(3, "X");
}

export async function POST(
  request: NextRequest
) {
  /* ADMIN KONTROLÜ */

  const sessionToken =
    request.cookies.get(
      "admin_session"
    )?.value;

  if (
    !verifyAdminSessionToken(
      sessionToken
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Yetkisiz erişim.",
      },
      {
        status: 401,
      }
    );
  }

  /* SAME ORIGIN */

  const origin =
    request.headers.get("origin");

  const expectedOrigin =
    new URL(request.url).origin;

  if (
    origin &&
    origin !== expectedOrigin
  ) {
    return NextResponse.json(
      {
        error:
          "Geçersiz istek kaynağı.",
      },
      {
        status: 403,
      }
    );
  }

  const body =
    await request.json();

  const {
    businessName,
    slug,
    googleUrl,
    instagramUrl,
    mapsUrl,
    phone,
    cardCount,
    template,
  } = body;

  if (
    !businessName ||
    !slug ||
    !googleUrl
  ) {
    return NextResponse.json(
      {
        error:
          "Zorunlu alanlar eksik.",
      },
      {
        status: 400,
      }
    );
  }

  const normalizedSlug = String(
    slug
  )
    .trim()
    .toLowerCase();

  const count =
    Math.min(
      20,
      Math.max(
        1,
        Number(cardCount) || 1
      )
    );

  const prefix =
    makePrefix(normalizedSlug);

  const supabase =
    createAdminClient();

  /* İŞLETME OLUŞTUR */

  const {
    data: business,
    error: businessError,
  } = await supabase
    .from("businesses")
    .insert({
      name: businessName,
      slug: normalizedSlug,
      google_url:
        googleUrl || null,
      instagram_url:
        instagramUrl || null,
      maps_url:
        mapsUrl || null,
      phone:
        phone || null,
      template:
        template ||
        "Cafe Premium",
      active: true,
    })
    .select("id, name, slug")
    .single();

  if (businessError) {
    console.error(
      businessError
    );

    if (
      businessError.code ===
      "23505"
    ) {
      return NextResponse.json(
        {
          error:
            "Bu slug zaten kullanılıyor.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "İşletme oluşturulamadı.",
      },
      {
        status: 500,
      }
    );
  }

  /* COUNTER SETTINGS */

  const {
    error: counterError,
  } = await supabase
    .from("counter_settings")
    .upsert(
      {
        business:
          businessName,
        counter_version: 1,
        reset_at:
          new Date().toISOString(),
      },
      {
        onConflict: "business",
      }
    );

  if (counterError) {
    console.error(
      counterError
    );
  }

  /* KARTLAR */

  const cards = Array.from(
    {
      length: count,
    },
    (_, index) => {
      const number =
        String(
          index + 1
        ).padStart(2, "0");

      const code =
        `${prefix}${number}`;

      return {
        code,
        business:
          businessName,
        destination_url:
          `${new URL(
            request.url
          ).origin}/business/${normalizedSlug}?card=${code}`,
        active: true,
      };
    }
  );

  const {
    error: routesError,
  } = await supabase
    .from("nfc_routes")
    .insert(cards);

  if (routesError) {
    console.error(
      routesError
    );

    return NextResponse.json(
      {
        error:
          "Kart yönlendirmeleri oluşturulamadı.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      business,
      cards,
    },
    {
      status: 201,
    }
  );
}