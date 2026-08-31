import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.redirect(
      new URL("/istatistik?error=1", request.url),
      303
    );
  }

  const response = NextResponse.redirect(
    new URL("/istatistik", request.url),
    303
  );

  response.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}