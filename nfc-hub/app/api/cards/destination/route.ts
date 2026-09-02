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

/* =========================
   ADMIN KONTROLÜ
========================= */

function isAdminAuthenticated(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "admin_session"
    )?.value;

  return verifyAdminSessionToken(
    token
  );
}

/* =========================
   SAME ORIGIN KONTROLÜ
========================= */

function isValidOrigin(
  request: NextRequest
) {
  const origin =
    request.headers.get(
      "origin"
    );

  if (!origin) {
    return true;
  }

  const expectedOrigin =
    new URL(
      request.url
    ).origin;

  return (
    origin ===
    expectedOrigin
  );
}

/* =========================
   HEDEF DEĞİŞTİR
========================= */

export async function POST(
  request: NextRequest
) {
  if (
    !isAdminAuthenticated(
      request
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

  if (
    !isValidOrigin(
      request
    )
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

  const formData =
    await request.formData();

  const rawCode =
    formData
      .get("code")
      ?.toString();

  const rawDestination =
    formData
      .get(
        "destination"
      )
      ?.toString();

  const code =
    rawCode
      ?.trim()
      .toUpperCase();

  const destination =
    rawDestination?.trim();

  if (
    !code ||
    !destination
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/kartlar?error=missing",
        request.url
      ),
      303
    );
  }

  /* =========================
     HTTPS KONTROLÜ
  ========================= */

  let targetUrl: URL;

  try {
    targetUrl =
      new URL(
        destination
      );
  } catch {
    return NextResponse.redirect(
      new URL(
        "/admin/kartlar?error=invalid-url",
        request.url
      ),
      303
    );
  }

  if (
    targetUrl.protocol !==
    "https:"
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/kartlar?error=https-required",
        request.url
      ),
      303
    );
  }

  const supabase =
    createAdminClient();

  /* =========================
     KART VAR MI?
  ========================= */

  const {
    data: existingCard,
    error: readError,
  } = await supabase
    .from("nfc_routes")
    .select(
      "code, business"
    )
    .eq(
      "code",
      code
    )
    .maybeSingle();

  if (
    readError ||
    !existingCard
  ) {
    console.error(
      "Kart bulunamadı:",
      readError
    );

    return NextResponse.redirect(
      new URL(
        "/admin/kartlar?error=not-found",
        request.url
      ),
      303
    );
  }

  /* =========================
     HEDEFİ GÜNCELLE
  ========================= */

  const {
    error: updateError,
  } = await supabase
    .from("nfc_routes")
    .update({
      destination_url:
        targetUrl.toString(),

      updated_at:
        new Date().toISOString(),
    })
    .eq(
      "code",
      code
    );

  if (updateError) {
    console.error(
      "Kart hedefi değiştirilemedi:",
      updateError
    );

    return NextResponse.redirect(
      new URL(
        "/admin/kartlar?error=update",
        request.url
      ),
      303
    );
  }

  return NextResponse.redirect(
    new URL(
      `/admin/kartlar?success=destination&code=${encodeURIComponent(
        code
      )}`,
      request.url
    ),
    303
  );
}