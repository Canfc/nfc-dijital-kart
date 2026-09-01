import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const destinations: Record<string, string> = {
  yemlihagerek:
    "https://www.instagram.com/yemlihagerek?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

  cadirkeyfi:
    "https://www.instagram.com/cadirkeyfi?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

  marmarafest:
    "https://www.instagram.com/marmarafest?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

  kocaeliplani:
    "https://www.instagram.com/kocaeliplani?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

  cadirkeyfivoleybol:
    "https://www.instagram.com/cadirkeyfivoleybol?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
};

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business = "Yemliha Gerek";

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