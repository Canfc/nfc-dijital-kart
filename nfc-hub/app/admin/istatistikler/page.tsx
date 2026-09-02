import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createAdminClient,
} from "../../../lib/supabase-admin";

import {
  verifyAdminSessionToken,
} from "../../../lib/admin-session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Business = {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  status: string | null;
};

type RouteRow = {
  code: string;
  business: string;
  active: boolean;
};

type VisitRow = {
  business: string;
  card_code: string | null;
  counter_version: number;
};

type ClickRow = {
  business: string;
  card_code: string | null;
  link_name: string;
  counter_version: number;
};

type CounterRow = {
  business: string;
  counter_version: number;
};

export default async function IstatistiklerPage() {
  /* =========================
     ADMIN KONTROLÜ
  ========================= */

  const cookieStore =
    await cookies();

  const sessionToken =
    cookieStore.get(
      "admin_session"
    )?.value;

  if (
    !verifyAdminSessionToken(
      sessionToken
    )
  ) {
    redirect(
      "/admin/yeni-isletme"
    );
  }

  const supabase =
    createAdminClient();

  /* =========================
     VERİLER
  ========================= */

  const [
    businessesResult,
    routesResult,
    visitsResult,
    clicksResult,
    countersResult,
  ] = await Promise.all([
    supabase
      .from("businesses")
      .select(
        "id, name, slug, active, status"
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      ),

    supabase
      .from("nfc_routes")
      .select(
        "code, business, active"
      ),

    supabase
      .from("visits")
      .select(
        "business, card_code, counter_version"
      ),

    supabase
      .from("link_clicks")
      .select(
        "business, card_code, link_name, counter_version"
      ),

    supabase
      .from("counter_settings")
      .select(
        "business, counter_version"
      ),
  ]);

  const businesses =
    (businessesResult.data ??
      []) as Business[];

  const routes =
    (routesResult.data ??
      []) as RouteRow[];

  const visits =
    (visitsResult.data ??
      []) as VisitRow[];

  const clicks =
    (clicksResult.data ??
      []) as ClickRow[];

  const counters =
    (countersResult.data ??
      []) as CounterRow[];

  /* =========================
     GENEL TOPLAMLAR
  ========================= */

  let totalVisits = 0;
  let totalGoogle = 0;
  let totalInstagram = 0;
  let totalLocation = 0;
  let totalPhone = 0;

  for (const business of businesses) {
    const currentVersion =
      counters.find(
        (row) =>
          row.business ===
          business.name
      )?.counter_version ?? 1;

    totalVisits +=
      visits.filter(
        (row) =>
          row.business ===
            business.name &&
          row.counter_version ===
            currentVersion
      ).length;

    const currentClicks =
      clicks.filter(
        (row) =>
          row.business ===
            business.name &&
          row.counter_version ===
            currentVersion
      );

    totalGoogle +=
      currentClicks.filter(
        (row) =>
          row.link_name ===
          "google"
      ).length;

    totalInstagram +=
      currentClicks.filter(
        (row) =>
          row.link_name ===
          "instagram"
      ).length;

    totalLocation +=
      currentClicks.filter(
        (row) =>
          row.link_name ===
          "konum"
      ).length;

    totalPhone +=
      currentClicks.filter(
        (row) =>
          row.link_name ===
          "telefon"
      ).length;
  }

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at 20% 0%, #17212a 0%, #0a1016 35%, #05080b 100%)",

        color: "#ffffff",

        fontFamily:
          "Arial, Helvetica, sans-serif",

        padding:
          "35px 18px 70px",

        boxSizing:
          "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <header
          style={{
            marginBottom: "27px",
          }}
        >
          <div
            style={{
              color: "#d4a853",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing:
                ".16em",
            }}
          >
            NFC HUB
          </div>

          <h1
            style={{
              margin:
                "7px 0 0",
              fontSize: "31px",
            }}
          >
            İstatistikler
          </h1>

          <p
            style={{
              color: "#84909b",
              fontSize: "13px",
              margin:
                "8px 0 0",
            }}
          >
            İşletme ve NFC kart
            performanslarını merkezi
            olarak görüntüleyin.
          </p>
        </header>

        {/* GENEL ÖZET */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",

            gap: "11px",

            marginBottom:
              "25px",
          }}
        >
          <Metric
            title="Ziyaret"
            value={totalVisits}
          />

          <Metric
            title="Google"
            value={totalGoogle}
          />

          <Metric
            title="Instagram"
            value={
              totalInstagram
            }
          />

          <Metric
            title="Konum"
            value={totalLocation}
          />

          <Metric
            title="Telefon"
            value={totalPhone}
          />
        </div>

        {/* İŞLETMELER */}

        <div
          style={{
            display: "grid",
            gap: "18px",
          }}
        >
          {businesses.map(
            (business) => {
              const currentVersion =
                counters.find(
                  (row) =>
                    row.business ===
                    business.name
                )
                  ?.counter_version ??
                1;

              const businessRoutes =
                routes.filter(
                  (route) =>
                    route.business ===
                    business.name
                );

              const businessVisits =
                visits.filter(
                  (visit) =>
                    visit.business ===
                      business.name &&
                    visit.counter_version ===
                      currentVersion
                );

              const businessClicks =
                clicks.filter(
                  (click) =>
                    click.business ===
                      business.name &&
                    click.counter_version ===
                      currentVersion
                );

              return (
                <section
                  key={
                    business.id
                  }
                  style={{
                    padding:
                      "21px",

                    borderRadius:
                      "18px",

                    background:
                      "linear-gradient(145deg, #111820, #0d1319)",

                    border:
                      "1px solid #28333d",

                    boxShadow:
                      "0 18px 50px rgba(0,0,0,.18)",
                  }}
                >
                  {/* İŞLETME BAŞLIK */}

                  <div
                    style={{
                      display:
                        "flex",

                      justifyContent:
                        "space-between",

                      alignItems:
                        "center",

                      gap: "15px",

                      flexWrap:
                        "wrap",

                      marginBottom:
                        "18px",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          margin: 0,

                          fontSize:
                            "19px",
                        }}
                      >
                        {
                          business.name
                        }
                      </h2>

                      <div
                        style={{
                          marginTop:
                            "5px",

                          color:
                            "#697580",

                          fontSize:
                            "10px",
                        }}
                      >
                        /business/
                        {
                          business.slug
                        }
                      </div>
                    </div>

                    <div
                      style={{
                        padding:
                          "6px 9px",

                        borderRadius:
                          "999px",

                        fontSize:
                          "9px",

                        fontWeight:
                          "900",

                        color:
                          business.active
                            ? "#66d994"
                            : "#e0a458",

                        border:
                          business.active
                            ? "1px solid #28583f"
                            : "1px solid #614927",

                        background:
                          "#0c1317",
                      }}
                    >
                      {business.active
                        ? "AKTİF"
                        : "PASİF"}
                    </div>
                  </div>

                  {/* İŞLETME ÖZET */}

                  <div
                    style={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(110px, 1fr))",

                      gap: "8px",

                      marginBottom:
                        "20px",
                    }}
                  >
                    <SmallMetric
                      label="Ziyaret"
                      value={
                        businessVisits.length
                      }
                    />

                    <SmallMetric
                      label="Google"
                      value={
                        businessClicks.filter(
                          (row) =>
                            row.link_name ===
                            "google"
                        ).length
                      }
                    />

                    <SmallMetric
                      label="Instagram"
                      value={
                        businessClicks.filter(
                          (row) =>
                            row.link_name ===
                            "instagram"
                        ).length
                      }
                    />

                    <SmallMetric
                      label="Konum"
                      value={
                        businessClicks.filter(
                          (row) =>
                            row.link_name ===
                            "konum"
                        ).length
                      }
                    />

                    <SmallMetric
                      label="Telefon"
                      value={
                        businessClicks.filter(
                          (row) =>
                            row.link_name ===
                            "telefon"
                        ).length
                      }
                    />
                  </div>

                  {/* KARTLAR */}

                  <div
                    style={{
                      color:
                        "#d7dde3",

                      fontSize:
                        "11px",

                      fontWeight:
                        "900",

                      marginBottom:
                        "10px",
                    }}
                  >
                    NFC KARTLARI
                  </div>

                  <div
                    style={{
                      display:
                        "grid",

                      gap: "9px",
                    }}
                  >
                    {businessRoutes.map(
                      (route) => {
                        const cardVisits =
                          businessVisits.filter(
                            (visit) =>
                              visit.card_code ===
                              route.code
                          ).length;

                        const cardClicks =
                          businessClicks.filter(
                            (click) =>
                              click.card_code ===
                              route.code
                          );

                        return (
                          <CardRow
                            key={
                              route.code
                            }
                            code={
                              route.code
                            }
                            active={
                              route.active
                            }
                            visits={
                              cardVisits
                            }
                            google={
                              cardClicks.filter(
                                (
                                  row
                                ) =>
                                  row.link_name ===
                                  "google"
                              )
                                .length
                            }
                            instagram={
                              cardClicks.filter(
                                (
                                  row
                                ) =>
                                  row.link_name ===
                                  "instagram"
                              )
                                .length
                            }
                            location={
                              cardClicks.filter(
                                (
                                  row
                                ) =>
                                  row.link_name ===
                                  "konum"
                              )
                                .length
                            }
                            phone={
                              cardClicks.filter(
                                (
                                  row
                                ) =>
                                  row.link_name ===
                                  "telefon"
                              )
                                .length
                            }
                          />
                        );
                      }
                    )}

                    {!businessRoutes.length && (
                      <div
                        style={{
                          color:
                            "#68737d",

                          fontSize:
                            "11px",

                          padding:
                            "12px",

                          background:
                            "#0b1117",

                          borderRadius:
                            "10px",
                        }}
                      >
                        Bu işletmeye
                        bağlı kart
                        bulunamadı.
                      </div>
                    )}
                  </div>
                </section>
              );
            }
          )}
        </div>
      </div>
    </main>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      style={{
        padding: "17px",

        borderRadius:
          "15px",

        background:
          "#10171e",

        border:
          "1px solid #28333d",
      }}
    >
      <div
        style={{
          color: "#78838e",

          fontSize: "10px",

          fontWeight: "700",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "7px",

          fontSize: "25px",

          fontWeight: "900",

          color: "#ffffff",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SmallMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      style={{
        padding: "11px",

        background:
          "#0b1117",

        border:
          "1px solid #242f38",

        borderRadius:
          "10px",
      }}
    >
      <div
        style={{
          color: "#69747e",
          fontSize: "9px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#ffffff",

          marginTop: "4px",

          fontSize: "16px",

          fontWeight: "900",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function CardRow({
  code,
  active,
  visits,
  google,
  instagram,
  location,
  phone,
}: {
  code: string;
  active: boolean;
  visits: number;
  google: number;
  instagram: number;
  location: number;
  phone: number;
}) {
  return (
    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "120px repeat(5, minmax(65px, 1fr))",

        gap: "8px",

        alignItems:
          "center",

        padding: "12px",

        borderRadius:
          "12px",

        background:
          "#0a1015",

        border:
          "1px solid #26313a",

        overflowX: "auto",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "12px",

            fontWeight: "900",

            color: "#d9b15c",
          }}
        >
          {code}
        </div>

        <div
          style={{
            fontSize: "8px",

            marginTop: "3px",

            color: active
              ? "#57cc86"
              : "#d08465",
          }}
        >
          {active
            ? "AKTİF"
            : "PASİF"}
        </div>
      </div>

      <Mini
        label="Ziyaret"
        value={visits}
      />

      <Mini
        label="Google"
        value={google}
      />

      <Mini
        label="Instagram"
        value={instagram}
      />

      <Mini
        label="Konum"
        value={location}
      />

      <Mini
        label="Telefon"
        value={phone}
      />
    </div>
  );
}

function Mini({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div
        style={{
          color: "#626e78",

          fontSize: "8px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: "3px",

          color: "#ffffff",

          fontSize: "13px",

          fontWeight: "800",
        }}
      >
        {value}
      </div>
    </div>
  );
}