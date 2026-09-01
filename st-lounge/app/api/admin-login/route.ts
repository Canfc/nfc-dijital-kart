import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  adminSessionMaxAge,
  createAdminSessionToken,
} from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

function passwordsMatch(
  enteredPassword: string,
  correctPassword: string
) {
  const entered = Buffer.from(enteredPassword);
  const correct = Buffer.from(correctPassword);

  if (entered.length !== correct.length) {
    return false;
  }

  return crypto.timingSafeEqual(entered, correct);
}

export async function POST(request: NextRequest) {
  /* =========================
     1. SAME-ORIGIN KONTROLÜ
  ========================= */

  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(request.url).origin;

  if (origin && origin !== expectedOrigin) {
    return NextResponse.json(
      { error: "Yetkisiz istek." },
      { status: 403 }
    );
  }

  /* =========================
     2. FORM VERİSİ
  ========================= */

  const formData = await request.formData();

  const enteredPassword =
    formData.get("password")?.toString() ?? "";

  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error(
      "ADMIN_PASSWORD environment variable tanımlı değil."
    );

    return NextResponse.redirect(
      new URL("/istatistik?error=config", request.url),
      303
    );
  }

  /* =========================
     3. ŞİFRE KONTROLÜ
  ========================= */

  if (
    !passwordsMatch(
      enteredPassword,
      adminPassword
    )
  ) {
    return NextResponse.redirect(
      new URL("/istatistik?error=password", request.url),
      303
    );
  }

  /* =========================
     4. İMZALI SESSION TOKEN
  ========================= */

  const sessionToken =
    createAdminSessionToken();

  const response = NextResponse.redirect(
    new URL("/istatistik", request.url),
    303
  );

  response.cookies.set(
    "admin_session",
    sessionToken,
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: adminSessionMaxAge,
    }
  );

  return response;
}