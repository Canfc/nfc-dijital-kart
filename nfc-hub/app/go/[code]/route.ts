import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const routes: Record<string, string> = {
  STL04: "https://st-lounge.vercel.app/go",
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  const normalizedCode = code.trim().toUpperCase();
  const destination = routes[normalizedCode];

  if (!destination) {
    return NextResponse.json(
      { error: "NFC kart bulunamadı." },
      { status: 404 }
    );
  }

  return NextResponse.redirect(destination, 307);
}
