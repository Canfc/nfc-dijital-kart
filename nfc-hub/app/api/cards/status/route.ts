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
   SAME ORIGIN
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
   KART DURUMU
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

  const rawActive =
    formData
      .get("active")
      ?.toString();

  const code =
    rawCode
      ?.trim()
      .toUpperCase();

  if (
    !code ||
    (
      rawActive !==
        "true" &&
      rawActive !==
        "false"
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/kartlar?error=invalid",
        request.url
      ),
      303
    );
  }

  const active =
    rawActive ===
    "true";

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
      "code, active"
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
     DURUMU GÜNCELLE
  ========================= */

  const {
    error: updateError,
  } = await supabase
    .from("nfc_routes")
    .update({
      active,

      updated_at:
        new Date().toISOString(),
    })
    .eq(
      "code",
      code
    );

  if (updateError) {
    console.error(
      "Kart durumu değiştirilemedi:",
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
      `/admin/kartlar?success=status&code=${encodeURIComponent(
        code
      )}`,
      request.url
    ),
    303
  );
}