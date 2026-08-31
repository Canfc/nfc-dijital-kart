import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const adminSession = request.cookies.get("admin_session")?.value;

  if (adminSession !== "authenticated") {
    return NextResponse.json(
      { error: "Yetkisiz işlem" },
      { status: 401 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  const business = "Coffitol Coffee House";

  const { data: settings, error: settingsError } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .single();

  if (settingsError || !settings) {
    return NextResponse.json(
      { error: "Sayaç ayarı okunamadı" },
      { status: 500 }
    );
  }

  const newVersion = settings.counter_version + 1;

  const { error } = await supabase
    .from("counter_settings")
    .update({
      counter_version: newVersion,
      reset_at: new Date().toISOString(),
    })
    .eq("business", business);

  if (error) {
    return NextResponse.json(
      { error: "Sayaç sıfırlanamadı" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(
    new URL("/istatistik", request.url),
    303
  );
}