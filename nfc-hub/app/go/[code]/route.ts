import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  const normalizedCode = code.trim().toUpperCase();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    return NextResponse.json(
      { error: "Supabase environment variables eksik." },
      { status: 500 }
    );
  }

  const supabase = createClient(
    supabaseUrl,
    secretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  const { data, error } = await supabase
    .from("nfc_routes")
    .select("code, business, destination_url, active")
    .eq("code", normalizedCode)
    .maybeSingle();

  if (error) {
    console.error("Supabase yönlendirme hatası:", error);

    return NextResponse.json(
      { error: "Yönlendirme kaydı okunamadı." },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "Bu NFC kodu bulunamadı." },
      { status: 404 }
    );
  }

  if (!data.active) {
    return NextResponse.json(
      { error: "Bu NFC kart şu anda pasif." },
      { status: 404 }
    );
  }

  if (!data.destination_url.startsWith("https://")) {
    return NextResponse.json(
      { error: "Geçersiz hedef URL." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(data.destination_url, {
    status: 307,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
