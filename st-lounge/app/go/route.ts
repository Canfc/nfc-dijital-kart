import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "../../lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();

  const business = "ST Lounge Cafe";

  /* Güncel sayaç dönemini al */
  const { data: settings, error: settingsError } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .single();

  if (settingsError || !settings) {
    console.error("Sayaç ayarı okunamadı:", settingsError);

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  const currentVersion = settings.counter_version;

  /* Tarayıcı daha önce ziyaret etmiş mi? */
  const existingVisitorId =
    request.cookies.get("visitor_id")?.value;

  const existingVersion =
    request.cookies.get("counter_version")?.value;

  /* Aynı ziyaretçi + aynı dönem ise tekrar sayma */
  if (
    existingVisitorId &&
    existingVersion === String(currentVersion)
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  /* Yeni ziyaretçi kimliği */
  const visitorId =
    existingVisitorId || crypto.randomUUID();

  /* Supabase'e server-side kayıt */
  const { error: insertError } = await supabase
    .from("visits")
    .insert({
      business,
      visitor_id: `${visitorId}_v${currentVersion}`,
      counter_version: currentVersion,
    });

  if (insertError) {
    console.error(
      "Ziyaret kaydı oluşturulamadı:",
      insertError
    );
  }

  /* Ana sayfaya yönlendir */
  const response = NextResponse.redirect(
    new URL("/", request.url)
  );

  /* Ziyaretçi kimliği */
  response.cookies.set(
    "visitor_id",
    visitorId,
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    }
  );

  /* Ziyaretçinin hangi sayaç döneminde sayıldığını sakla */
  response.cookies.set(
    "counter_version",
    String(currentVersion),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    }
  );

  return response;
}