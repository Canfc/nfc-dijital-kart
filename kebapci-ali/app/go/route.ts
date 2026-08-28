import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase
    .from("visits")
    .insert({
      business: "Kebapçı Ali",
    });

  if (error) {
    console.error("Sayaç hatası:", error);
  }

  return NextResponse.redirect(
    new URL("/", "https://kebapci-ali.vercel.app")
  );
}
