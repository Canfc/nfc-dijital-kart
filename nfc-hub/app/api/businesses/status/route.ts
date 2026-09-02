import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../../lib/supabase-admin";

import {
  verifyAdminSessionToken,
} from "../../../../lib/admin-session";

export const dynamic = "force-dynamic";

const allowedStatuses = new Set([
  "active",
  "passive",
  "archived",
]);

export async function POST(
  request: NextRequest
) {
  /* ADMIN KONTROLÜ */

  const sessionToken =
    request.cookies.get(
      "admin_session"
    )?.value;

  if (
    !verifyAdminSessionToken(
      sessionToken
    )
  ) {
    return NextResponse.json(
      {
        error: "Yetkisiz erişim.",
      },
      {
        status: 401,
      }
    );
  }

  /* SAME ORIGIN */

  const origin =
    request.headers.get("origin");

  const expectedOrigin =
    new URL(request.url).origin;

  if (
    origin &&
    origin !== expectedOrigin
  ) {
    return NextResponse.json(
      {
        error: "Geçersiz istek.",
      },
      {
        status: 403,
      }
    );
  }

  const formData =
    await request.formData();

  const slug =
    formData
      .get("slug")
      ?.toString()
      .trim();

  const status =
    formData
      .get("status")
      ?.toString()
      .trim();

  if (
    !slug ||
    !status ||
    !allowedStatuses.has(status)
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/isletmeler?error=invalid",
        request.url
      ),
      303
    );
  }

  const supabase =
    createAdminClient();

  /* İŞLETMEYİ BUL */

  const {
    data: business,
    error: businessReadError,
  } = await supabase
    .from("businesses")
    .select("name, slug")
    .eq("slug", slug)
    .single();

  if (
    businessReadError ||
    !business
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/isletmeler?error=notfound",
        request.url
      ),
      303
    );
  }

  const isActive =
    status === "active";

  /* İŞLETME DURUMU */

  const {
    error: businessUpdateError,
  } = await supabase
    .from("businesses")
    .update({
      status,
      active: isActive,
      updated_at:
        new Date().toISOString(),
    })
    .eq("slug", slug);

  if (businessUpdateError) {
    console.error(
      "İşletme durumu değiştirilemedi:",
      businessUpdateError
    );

    return NextResponse.redirect(
      new URL(
        "/admin/isletmeler?error=update",
        request.url
      ),
      303
    );
  }

  /* İŞLETMEYE BAĞLI TÜM NFC KARTLAR */

  const {
    error: routesError,
  } = await supabase
    .from("nfc_routes")
    .update({
      active: isActive,
      updated_at:
        new Date().toISOString(),
    })
    .eq(
      "business",
      business.name
    );

  if (routesError) {
    console.error(
      "Kart durumları değiştirilemedi:",
      routesError
    );
  }

  return NextResponse.redirect(
    new URL(
      `/admin/isletmeler?success=${status}`,
      request.url
    ),
    303
  );
}