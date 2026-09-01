import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../lib/supabase-admin";

import {
  verifyAdminSessionToken,
} from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
) {
  /* =========================
     SAME ORIGIN
  ========================= */

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
          "Yetkisiz istek.",
      },
      {
        status: 403,
      }
    );
  }

  /* =========================
     ADMIN SESSION
  ========================= */

  const adminSession =
    request.cookies.get(
      "admin_session"
    )?.value;

  const isAuthenticated =
    verifyAdminSessionToken(
      adminSession
    );

  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL(
        "/istatistik",
        request.url
      ),
      303
    );
  }

  /* =========================
     SUPABASE
  ========================= */

  const supabase =
    createAdminClient();

  const business =
    "ST Lounge Cafe";

  /* =========================
     MEVCUT DÖNEM
  ========================= */

  const {
    data: settings,
    error: settingsError,
  } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .single();

  if (
    settingsError ||
    !settings
  ) {
    console.error(
      "Sayaç ayarı okunamadı:",
      settingsError
    );

    return NextResponse.redirect(
      new URL(
        "/istatistik?error=reset",
        request.url
      ),
      303
    );
  }

  const currentVersion =
    settings.counter_version ??
    1;

  const newVersion =
    currentVersion + 1;

  /* =========================
     YENİ DÖNEM
  ========================= */

  const {
    error: updateError,
  } = await supabase
    .from("counter_settings")
    .update({
      counter_version:
        newVersion,

      reset_at:
        new Date().toISOString(),
    })
    .eq("business", business);

  if (updateError) {
    console.error(
      "Sayaç sıfırlanamadı:",
      updateError
    );

    return NextResponse.redirect(
      new URL(
        "/istatistik?error=reset",
        request.url
      ),
      303
    );
  }

  /* =========================
     BAŞARILI
  ========================= */

  return NextResponse.redirect(
    new URL(
      "/istatistik?reset=success",
      request.url
    ),
    303
  );
}