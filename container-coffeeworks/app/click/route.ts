import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const destinations: Record<string, string> = {
  google:
    "https://search.google.com/local/writereview?placeid=ChIJV2Kq8sdFyxQRELofFptvVrg",

  instagram:
    "https://www.instagram.com/container.coffeeworks?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

  konum:
    "https://share.google/qsgBVDcDm6e42mpt6",

  telefon:
    "tel:+905412554509",
};

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business = "Container Coffee Works";

  const link = request.nextUrl.searchParams.get("link");
  const destination = link ? destinations[link] : null;

  if (!link || !destination) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const visitorId = request.cookies.get("visitor_id")?.value;

  const { data: settings } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .maybeSingle();

  const counterVersion = settings?.counter_version ?? 1;

  if (visitorId) {
    const { error } = await supabase.from("link_clicks").insert({
      business,
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