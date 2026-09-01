import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "../../../lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      code: string;
    }>;
  }
) {
  const { code } = await context.params;

  const normalizedCode =
    code.trim().toUpperCase();

  if (!normalizedCode) {
    return NextResponse.json(
      {
        error: "Geçersiz NFC kodu.",
      },
      {
        status: 400,
      }
    );
  }

  const supabase =
    createAdminClient();

  const {
    data: route,
    error,
  } = await supabase
    .from("nfc_routes")
    .select(
      "business, destination_url, active"
    )
    .eq("code", normalizedCode)
    .maybeSingle();

  if (error) {
    console.error(
      "NFC yönlendirme hatası:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Yönlendirme servisine ulaşılamadı.",
      },
      {
        status: 500,
      }
    );
  }

  if (
    !route ||
    !route.active ||
    !route.destination_url
  ) {
    return NextResponse.json(
      {
        error:
          "NFC kart bulunamadı veya pasif.",
      },
      {
        status: 404,
      }
    );
  }

  if (
    !route.destination_url.startsWith(
      "https://"
    )
  ) {
    console.error(
      "Geçersiz destination:",
      normalizedCode
    );

    return NextResponse.json(
      {
        error:
          "Geçersiz yönlendirme.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.redirect(
    route.destination_url,
    307
  );
}