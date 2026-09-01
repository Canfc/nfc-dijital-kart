import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

const allowedCards = new Set([
  "CON01",
  "CON02",
  "CON03",
  "CON04",
  "CON05",
]);

export async function GET(request: NextRequest) {
  const linkName =
    request.nextUrl.searchParams.get("link");

  if (!linkName || !destinations[linkName]) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  const destination = destinations[linkName];

  const visitorId =
    request.cookies.get("visitor_id")?.value;

  /*
    /go route'u hangi fiziksel karttan
    geldiğimizi bu cookie ile saklıyor.
  */
  const cookieCardCode =
    request.cookies
      .get("active_card_code")
      ?.value
      ?.trim()
      .toUpperCase();

  /*
    Eski Container kartı / eski ziyaretler
    için varsayılan kart CON01.
  */
  const cardCode =
    cookieCardCode &&
    allowedCards.has(cookieCardCode)
      ? cookieCardCode
      : "CON01";

  /*
    visitor_id yoksa kullanıcı doğrudan
    ana sayfaya gelmiş olabilir.
    Link yine çalışsın fakat istatistik
    kaydı oluşturmayalım.
  */
  if (!visitorId) {
    return NextResponse.redirect(destination);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business =
    "Container Coffee Works";

  const {
    data: settings,
    error: settingsError,
  } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .single();

  if (settingsError || !settings) {
    console.error(
      "Sayaç ayarı okunamadı:",
      settingsError
    );

    return NextResponse.redirect(destination);
  }

  const currentVersion =
    settings.counter_version;

  /*
    Kart kodunu visitor_id'ye de ekliyoruz.

    Böylece aynı kişi:
    CON01 Google'a tıklarsa 1,
    CON02 Google'a tıklarsa ayrıca 1
    sayılabilir.

    Aynı karttan aynı linke tekrar
    tıklarsa unique index tekrar saymaz.
  */
  const clickVisitorId =
    `${visitorId}_${cardCode}`;

  const { error: clickError } =
    await supabase
      .from("link_clicks")
      .insert({
        business,
        visitor_id: clickVisitorId,
        link_name: linkName,
        counter_version: currentVersion,
        card_code: cardCode,
      });

  /*
    23505:
    Aynı kişi + aynı kart + aynı link +
    aynı sayaç döneminde daha önce
    kaydedilmiş demektir.
  */
  if (
    clickError &&
    clickError.code !== "23505"
  ) {
    console.error(
      "Link tıklaması kaydedilemedi:",
      clickError
    );
  }

  return NextResponse.redirect(destination);
}