import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../lib/supabase-admin";

export const dynamic = "force-dynamic";

const destinations: Record<string, string> = {
  google:
    "https://search.google.com/local/writereview?placeid=ChIJKcx3gqJRyxQR9nE65zyhITU",

  instagram:
    "https://www.instagram.com/stlounge.cafe?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

  konum:
    "https://www.google.com/maps?vet=10CAAQoqAOahcKEwiIxZ3n_MuWAxUAAAAAHQAAAAAQCA..i&sca_esv=f6fa7329d2cd1b6e&client=opera&hs=kna&pvq=Cg0vZy8xMXl4emp6cjB6IhwKFsWfYXLEsW1lc2UgbG91bmdlIGNhZmUQAhgD&lqi=ChbFn2FyxLFtZXNlIGxvdW5nZ2UgY2FmZSoECAMQApIBBGNhZmU&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=tr&sa=X&geocode=KSnMd4KiUcsUMfZxOuc8oSE1&daddr=B1blok+dış+kapı,+Fatih+Sultan+Mehmet,+hanımağa+caddesi+no:31D,+41250+Kartepe/Kocaeli",
};

export async function GET(request: NextRequest) {
  const linkName = request.nextUrl.searchParams.get("link");

  if (!linkName || !destinations[linkName]) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const destination = destinations[linkName];

  const supabase = createAdminClient();

  const business = "ST Lounge Cafe";

  /* Ziyaretçi kimliğini cookie'den al */
  const visitorId =
    request.cookies.get("visitor_id")?.value ?? null;

  /* Güncel sayaç dönemini al */
  const { data: settings, error: settingsError } =
    await supabase
      .from("counter_settings")
      .select("counter_version")
      .eq("business", business)
      .single();

  if (settingsError || !settings) {
    console.error(
      "Sayaç ayarı okunamadı:",
      settingsError
    );

    /*
      İstatistik kaydedilemese bile
      kullanıcı istediği bağlantıya gidebilsin.
    */
    return NextResponse.redirect(destination);
  }

  const currentVersion = settings.counter_version;

  /* Link tıklamasını kaydet */
  const { error: clickError } = await supabase
    .from("link_clicks")
    .insert({
      business,
      visitor_id: visitorId,
      link_name: linkName,
      counter_version: currentVersion,
    });

  /*
    23505 = aynı kişi aynı dönemde
    aynı bağlantıya daha önce tıklamış.
    Bu hata normaldir ve tekrar sayılmaz.
  */
  if (clickError && clickError.code !== "23505") {
    console.error(
      "Link tıklaması kaydedilemedi:",
      clickError
    );
  }

  return NextResponse.redirect(destination);
}