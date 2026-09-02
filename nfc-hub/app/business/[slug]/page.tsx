import {
  notFound,
} from "next/navigation";

import {
  createAdminClient,
} from "../../../lib/supabase-admin";

import {
  getBusinessTemplate,
} from "../../../components/business-templates";

export const dynamic =
  "force-dynamic";

export const revalidate = 0;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    card?:
      | string
      | string[];
  }>;
};

export default async function BusinessPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } =
    await params;

  const query =
    await searchParams;

  const card =
    Array.isArray(query.card)
      ? query.card[0]
      : query.card;

  const supabase =
    createAdminClient();

  const {
    data: business,
    error,
  } = await supabase
    .from("businesses")
    .select(`
      id,
      name,
      slug,
      google_url,
      instagram_url,
      maps_url,
      phone,
      template,
      active,
      status
    `)
    .eq("slug", slug)
    .maybeSingle();

  if (
    error ||
    !business
  ) {
    notFound();
  }

  /*
    İŞLETME AKTİF Mİ?
  */

  const isActive =
    business.active === true &&
    business.status !==
      "passive" &&
    business.status !==
      "archived";

  if (!isActive) {
    return (
      <main
        style={{
          minHeight:
            "100vh",

          display:
            "grid",

          placeItems:
            "center",

          background:
            "#070a0d",

          color:
            "#ffffff",

          padding:
            "25px",

          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",

            maxWidth:
              "420px",

            padding:
              "35px 25px",

            borderRadius:
              "20px",

            textAlign:
              "center",

            background:
              "#10161c",

            border:
              "1px solid #29333d",
          }}
        >
          <div
            style={{
              fontSize:
                "35px",

              fontWeight:
                "900",

              marginBottom:
                "15px",
            }}
          >
            NFC
          </div>

          <h1
            style={{
              fontSize:
                "20px",

              margin: 0,
            }}
          >
            Bu işletme şu
            anda aktif değil
          </h1>

          <p
            style={{
              color:
                "#808b95",

              fontSize:
                "12px",

              lineHeight:
                1.6,
            }}
          >
            NFC yönlendirmesi
            geçici olarak
            devre dışı
            bırakılmıştır.
          </p>
        </div>
      </main>
    );
  }

  /*
    ŞABLONU BELİRLE
  */

  const Template =
    getBusinessTemplate(
      business.slug,
      business.template
    );

  /*
    SEÇİLEN ŞABLONU
    ÇALIŞTIR
  */

  return (
    <Template
      business={business}
      card={card}
    />
  );
}