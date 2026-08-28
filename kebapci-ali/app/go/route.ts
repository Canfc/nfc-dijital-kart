import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business = "Kebapçı Ali";

  // Güncel sayaç dönemini Supabase'ten al
  const { data: settings, error: settingsError } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .single();

  if (settingsError || !settings) {
    console.error("Sayaç ayarı okunamadı:", settingsError);

    return NextResponse.redirect(
      new URL("/", "https://kebapci-ali.vercel.app")
    );
  }

  const currentVersion = settings.counter_version;

  const existingVisitorId = request.cookies.get("visitor_id")?.value;
  const existingVersion = request.cookies.get("counter_version")?.value;

  // Aynı ziyaretçi ve aynı sayaç dönemi ise tekrar sayma
  if (
    existingVisitorId &&
    existingVersion === String(currentVersion)
  ) {
    return NextResponse.redirect(
      new URL("/", "https://kebapci-ali.vercel.app")
    );
  }

  // İlk kez geliyorsa yeni ID oluştur,
  // eski ziyaretçiyse aynı ID'yi koru
  const visitorId = existingVisitorId || crypto.randomUUID();

  const { error } = await supabase
    .from("visits")
    .insert({
      business,
      visitor_id: `${visitorId}_v${currentVersion}`,
    });

  if (error) {
    console.error("Sayaç hatası:", error);
  }

  const response = NextResponse.redirect(
    new URL("/", "https://kebapci-ali.vercel.app")
  );

  response.cookies.set("visitor_id", visitorId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  response.cookies.set("counter_version", String(currentVersion), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}