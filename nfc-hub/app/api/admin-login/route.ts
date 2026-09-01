import crypto from "crypto";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  adminSessionMaxAge,
  createAdminSessionToken,
} from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

function passwordsMatch(
  enteredPassword: string,
  correctPassword: string
) {
  const entered = Buffer.from(
    enteredPassword,
    "utf8"
  );

  const correct = Buffer.from(
    correctPassword,
    "utf8"
  );

  if (entered.length !== correct.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    entered,
    correct
  );
}

export async function POST(
  request: NextRequest
) {
  const origin =
    request.headers.get("origin");

  const expectedOrigin =
    new URL(request.url).origin;

  if (origin && origin !== expectedOrigin) {
    return NextResponse.json(
      {
        error: "Yetkisiz istek.",
      },
      {
        status: 403,
      }
    );
  }

  const formData =
    await request.formData();

  const enteredPassword =
    formData
      .get("password")
      ?.toString() ?? "";

  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error(
      "ADMIN_PASSWORD tanımlı değil."
    );

    return NextResponse.json(
      {
        error:
          "Sunucu yapılandırması eksik.",
      },
      {
        status: 500,
      }
    );
  }

  if (
    !passwordsMatch(
      enteredPassword,
      adminPassword
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/yeni-isletme?error=password",
        request.url
      ),
      303
    );
  }

  const token =
    createAdminSessionToken();

  const response =
    NextResponse.redirect(
      new URL(
        "/admin/yeni-isletme",
        request.url
      ),
      303
    );

  response.cookies.set(
    "admin_session",
    token,
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