import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const destinations: Record<string, string> = {
  google:
    "https://search.google.com/local/writereview?placeid=ChIJyYGHXZ9RyxQRX40H3drSp_w",
  instagram: "https://instagram.com/kebapciali41",
  konum: "https://maps.app.goo.gl/59PaBgfnFYpoxQSUA?g_st=ic",
  telefon: "tel:+905472832727",
};

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const link = request.nextUrl.searchParams.get("link");
  const destination = link ? destinations[link] : null;

  if (!link || !destination) {
    return NextResponse.redirect(
      new URL("/", "https://kebapci-ali.vercel.app")
    );
  }

  const visitorId = request.cookies.get("visitor_id")?.value;

  const { data: settings } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", "Kebapçı Ali")
    .maybeSingle();

  const counterVersion = settings?.counter_version ?? 1;

  if (visitorId) {
    const { error } = await supabase.from("link_clicks").insert({
      business: "Kebapçı Ali",
      visitor_id: visitorId,
      link_name: link,
      counter_version: counterVersion,
    });

    if (error && error.code !== "23505") {
      console.error("Link takip hatası:", error);
    }
  }

  return NextResponse.redirect(destination);
}