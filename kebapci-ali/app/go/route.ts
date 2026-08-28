import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const existingVisitorId = request.cookies.get("visitor_id")?.value;

  // Daha önce bu tarayıcıya visitor_id verilmişse tekrar sayma
  if (existingVisitorId) {
    return NextResponse.redirect(
      new URL("/", "https://kebapci-ali.vercel.app")
    );
  }

  // İlk ziyaret
  const visitorId = crypto.randomUUID();

  const { error } = await supabase
    .from("visits")
    .insert({
      business: "Kebapçı Ali",
      visitor_id: visitorId,
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

  return response;
}