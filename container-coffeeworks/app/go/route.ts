import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const allowedCards = new Set([
  "CON01",
  "CON02",
  "CON03",
  "CON04",
  "CON05",
]);

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business = "Container Coffee Works";

  /*
    Eski fiziksel Container kartı doğrudan /go
    adresini kullanıyorsa otomatik CON01 kabul edilir.
  */
  const requestedCard =
    request.nextUrl.searchParams
      .get("card")
      ?.trim()
      .toUpperCase() || "CON01";

  if (!allowedCards.has(requestedCard)) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  const cardCode = requestedCard;

  /* Güncel sayaç dönemi */
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

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  const currentVersion =
    settings.counter_version;

  /*
    Tarayıcının temel ziyaretçi kimliği.
    Tüm kartlarda aynı kalır.
  */
  const existingVisitorId =
    request.cookies.get("visitor_id")?.value;

  const visitorId =
    existingVisitorId || crypto.randomUUID();

  /*
    Her karta özel cookie.
    Örneğin:
    counted_CON02 = 3
  */
  const cardCookieName =
    `counted_${cardCode}`;

  const countedVersion =
    request.cookies.get(
      cardCookieName
    )?.value;

  /*
    Kullanıcı bu kartı bu sayaç döneminde
    daha önce okutmuşsa tekrar sayma.
  */
  if (
    countedVersion ===
    String(currentVersion)
  ) {
    const response =
      NextResponse.redirect(
        new URL("/", request.url)
      );

    response.cookies.set(
      "active_card_code",
      cardCode,
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

  /*
    visitor_id içine kart kodunu da koyuyoruz.

    Böylece aynı kişi:
    CON01 okutursa 1,
    CON02 okutursa ayrıca 1
    sayılabilir.
  */
  const databaseVisitorId =
    `${visitorId}_${cardCode}_v${currentVersion}`;

  const { error: insertError } =
    await supabase
      .from("visits")
      .insert({
        business,
        visitor_id: databaseVisitorId,
        counter_version: currentVersion,
        card_code: cardCode,
      });

  if (
    insertError &&
    insertError.code !== "23505"
  ) {
    console.error(
      "Ziyaret kaydı oluşturulamadı:",
      insertError
    );
  }

  const response =
    NextResponse.redirect(
      new URL("/", request.url)
    );

  /* Tarayıcı kimliği */
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

  /* Bu kartın sayıldığını kaydet */
  response.cookies.set(
    cardCookieName,
    String(currentVersion),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    }
  );

  /*
    Hangi karttan geldiğini saklıyoruz.
    Sonraki aşamada link tıklamalarını da
    kart bazında takip edebiliriz.
  */
  response.cookies.set(
    "active_card_code",
    cardCode,
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