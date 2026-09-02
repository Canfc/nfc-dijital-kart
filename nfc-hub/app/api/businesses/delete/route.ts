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

export async function POST(
  request: NextRequest
) {
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

  const confirmation =
    formData
      .get("confirmation")
      ?.toString()
      .trim();

  if (
    !slug ||
    confirmation !== slug
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/isletmeler?error=confirmation",
        request.url
      ),
      303
    );
  }

  const supabase =
    createAdminClient();

  const {
    data: business,
    error: businessError,
  } = await supabase
    .from("businesses")
    .select("name, slug")
    .eq("slug", slug)
    .single();

  if (
    businessError ||
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

  const businessName =
    business.name;

  /*
    KALICI TEMİZLEME

    Sıralama önemli:
    önce ilişkili kayıtları siliyoruz,
    en son işletmeyi siliyoruz.
  */

  const { error: routeError } =
    await supabase
      .from("nfc_routes")
      .delete()
      .eq(
        "business",
        businessName
      );

  if (routeError) {
    console.error(
      "nfc_routes silinemedi:",
      routeError
    );

    return NextResponse.redirect(
      new URL(
        "/admin/isletmeler?error=delete",
        request.url
      ),
      303
    );
  }

  const { error: clickError } =
    await supabase
      .from("link_clicks")
      .delete()
      .eq(
        "business",
        businessName
      );

  if (clickError) {
    console.error(
      "link_clicks silinemedi:",
      clickError
    );
  }

  const { error: visitsError } =
    await supabase
      .from("visits")
      .delete()
      .eq(
        "business",
        businessName
      );

  if (visitsError) {
    console.error(
      "visits silinemedi:",
      visitsError
    );
  }

  const { error: counterError } =
    await supabase
      .from("counter_settings")
      .delete()
      .eq(
        "business",
        businessName
      );

  if (counterError) {
    console.error(
      "counter_settings silinemedi:",
      counterError
    );
  }

  const { error: finalError } =
    await supabase
      .from("businesses")
      .delete()
      .eq(
        "slug",
        slug
      );

  if (finalError) {
    console.error(
      "İşletme silinemedi:",
      finalError
    );

    return NextResponse.redirect(
      new URL(
        "/admin/isletmeler?error=delete",
        request.url
      ),
      303
    );
  }

  return NextResponse.redirect(
    new URL(
      "/admin/isletmeler?success=deleted",
      request.url
    ),
    303
  );
}