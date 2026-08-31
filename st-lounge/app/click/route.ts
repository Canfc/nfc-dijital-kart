import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const destinations: Record<string, string> = {
  google:
    "https://search.google.com/local/writereview?placeid=ChIJKcx3gqJRyxQR9nE65zyhITU",

  instagram:
    "https://www.instagram.com/stlounge.cafe?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

  konum:
    "https://www.google.com/maps?vet=10CAAQoqAOahcKEwiIxZ3n_MuWAxUAAAAAHQAAAAAQCA..i&sca_esv=f6fa7329d2cd1b6e&client=opera&hs=kna&pvq=Cg0vZy8xMXl4emp6cjB6IhwKFsWfYXLEsW1lc2UgbG91bmdlIGNhZmUQAhgD&lqi=ChbFn2FyxLFtZXNlIGxvdW5nZSBjYWZlSJ64vejzvYCACFooEAAQARACGAEYAiIWxZ9hcsSxbWVzZSBsb3VuZ2UgY2FmZSoECAMQApIBBGNhZmU&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&geocode=KSnMd4KiUcsUMfZxOuc8oSE1&daddr=B1blok+dış+kapı,+Fatih+Sultan+Mehmet,+hanımağa+caddesi+no:31D,+41250+Kartepe/Kocaeli",
};

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business = "ST Lounge Cafe";

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