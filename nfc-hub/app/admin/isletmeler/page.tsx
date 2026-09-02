import {
  cookies,
} from "next/headers";

import {
  redirect,
} from "next/navigation";

import {
  createAdminClient,
} from "../../../lib/supabase-admin";

import {
  verifyAdminSessionToken,
} from "../../../lib/admin-session";

export const dynamic =
  "force-dynamic";

export default async function IsletmelerPage() {
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

  const {
    data: businesses,
    error,
  } = await supabase
    .from("businesses")
    .select(
      `
      id,
      name,
      slug,
      google_url,
      instagram_url,
      maps_url,
      phone,
      template,
      active,
      status,
      created_at
      `
    )
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {
    console.error(error);
  }

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at 20% 0%, #17212a 0%, #0b1117 32%, #05080b 100%)",

        color: "#ffffff",

        fontFamily:
          "Arial, Helvetica, sans-serif",

        padding:
          "34px 18px 70px",

        boxSizing:
          "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <header
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "flex-end",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom:
              "27px",
          }}
        >
          <div>
            <div
              style={{
                color:
                  "#d4a853",

                fontSize:
                  "11px",

                fontWeight:
                  "800",

                letterSpacing:
                  "0.15em",
              }}
            >
              NFC HUB
            </div>

            <h1
              style={{
                margin:
                  "7px 0 0",

                fontSize:
                  "30px",
              }}
            >
              İşletmeler
            </h1>

            <p
              style={{
                color:
                  "#8c97a2",

                fontSize:
                  "13px",

                margin:
                  "8px 0 0",
              }}
            >
              İşletmeleri,
              durumlarını ve NFC
              yönlendirmelerini
              yönetin.
            </p>
          </div>

          <a
            href="/admin/yeni-isletme"
            style={{
              textDecoration:
                "none",

              padding:
                "13px 18px",

              borderRadius:
                "11px",

              background:
                "linear-gradient(135deg, #c89332, #efc967)",

              color:
                "#161109",

              fontWeight:
                "900",

              fontSize:
                "12px",

              border:
                "1px solid #e2b453",
            }}
          >
            + Yeni İşletme
          </a>
        </header>

        {/* İŞLETMELER */}

        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          {businesses?.map(
            (business) => (
              <BusinessCard
                key={
                  business.id
                }
                business={
                  business
                }
              />
            )
          )}

          {!businesses?.length && (
            <div
              style={{
                padding:
                  "35px",

                textAlign:
                  "center",

                background:
                  "#10171e",

                border:
                  "1px solid #26313b",

                borderRadius:
                  "18px",

                color:
                  "#87919c",
              }}
            >
              Henüz işletme
              oluşturulmamış.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function BusinessCard({
  business,
}: {
  business: any;
}) {
  const status =
    business.status ??
    (business.active
      ? "active"
      : "passive");

  const statusText =
    status === "active"
      ? "AKTİF"
      : status === "passive"
        ? "PASİF"
        : "ARŞİVLENMİŞ";

  const statusColor =
    status === "active"
      ? "#67d895"
      : status === "passive"
        ? "#f2b65f"
        : "#929ba5";

  return (
    <section
      style={{
        padding: "21px",

        background:
          "linear-gradient(145deg, #111820, #0d1319)",

        border:
          "1px solid #27323d",

        borderRadius:
          "18px",

        boxShadow:
          "0 15px 35px rgba(0,0,0,.18)",
      }}
    >
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          gap: "20px",

          alignItems:
            "flex-start",

          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: "10px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize:
                  "19px",
              }}
            >
              {business.name}
            </h2>

            <span
              style={{
                padding:
                  "5px 8px",

                borderRadius:
                  "999px",

                fontSize:
                  "9px",

                fontWeight:
                  "900",

                color:
                  statusColor,

                background:
                  "#0d1419",

                border:
                  `1px solid ${statusColor}55`,
              }}
            >
              {statusText}
            </span>
          </div>

          <div
            style={{
              color:
                "#7d8791",

              fontSize:
                "11px",

              marginTop:
                "6px",
            }}
          >
            /business/
            {business.slug}
          </div>

          <div
            style={{
              color:
                "#606b75",

              fontSize:
                "10px",

              marginTop:
                "5px",
            }}
          >
            Şablon:{" "}
            {business.template}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {status !==
            "active" && (
            <StatusButton
              slug={
                business.slug
              }
              status="active"
              text="Aktif Et"
            />
          )}

          {status ===
            "active" && (
            <StatusButton
              slug={
                business.slug
              }
              status="passive"
              text="Pasife Al"
            />
          )}

          {status !==
            "archived" && (
            <StatusButton
              slug={
                business.slug
              }
              status="archived"
              text="Arşivle"
            />
          )}
        </div>
      </div>

      {/* BAĞLANTILAR */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(170px, 1fr))",

          gap: "9px",

          marginTop: "20px",
        }}
      >
        <Info
          label="Google"
          value={
            business.google_url
          }
        />

        <Info
          label="Instagram"
          value={
            business.instagram_url
          }
        />

        <Info
          label="Konum"
          value={
            business.maps_url
          }
        />

        <Info
          label="Telefon"
          value={
            business.phone
          }
        />
      </div>

      {/* TEHLİKELİ BÖLGE */}

      <details
        style={{
          marginTop: "19px",

          paddingTop: "15px",

          borderTop:
            "1px solid #252f38",
        }}
      >
        <summary
          style={{
            color:
              "#d16068",

            cursor:
              "pointer",

            fontSize:
              "11px",

            fontWeight:
              "800",
          }}
        >
          Tehlikeli Bölge
        </summary>

        <div
          style={{
            marginTop:
              "13px",

            padding:
              "14px",

            background:
              "#211215",

            border:
              "1px solid #512a30",

            borderRadius:
              "12px",
          }}
        >
          <div
            style={{
              color:
                "#ffadb2",

              fontSize:
                "11px",

              lineHeight:
                1.5,

              marginBottom:
                "11px",
            }}
          >
            Kalıcı silme;
            işletmeyi,
            yönlendirmeleri,
            ziyaretleri ve
            etkileşim
            istatistiklerini
            geri döndürülemez
            şekilde siler.
          </div>

          <form
            action="/api/businesses/delete"
            method="POST"
          >
            <input
              type="hidden"
              name="slug"
              value={
                business.slug
              }
            />

            <input
              name="confirmation"
              placeholder={`Silmek için ${business.slug} yazın`}
              required
              style={{
                width: "100%",
                boxSizing:
                  "border-box",

                padding:
                  "11px 12px",

                background:
                  "#0d0a0b",

                border:
                  "1px solid #513238",

                borderRadius:
                  "9px",

                color:
                  "#ffffff",

                outline:
                  "none",
              }}
            />

            <button
              type="submit"
              style={{
                marginTop:
                  "9px",

                width:
                  "100%",

                padding:
                  "11px",

                borderRadius:
                  "9px",

                border:
                  "1px solid #ca4b55",

                background:
                  "#922f37",

                color:
                  "#ffffff",

                fontWeight:
                  "800",

                cursor:
                  "pointer",
              }}
            >
              İşletmeyi Kalıcı
              Olarak Sil
            </button>
          </form>
        </div>
      </details>
    </section>
  );
}

function StatusButton({
  slug,
  status,
  text,
}: {
  slug: string;
  status:
    | "active"
    | "passive"
    | "archived";
  text: string;
}) {
  return (
    <form
      action="/api/businesses/status"
      method="POST"
    >
      <input
        type="hidden"
        name="slug"
        value={slug}
      />

      <input
        type="hidden"
        name="status"
        value={status}
      />

      <button
        type="submit"
        style={{
          padding:
            "9px 12px",

          borderRadius:
            "9px",

          background:
            "#151d24",

          border:
            "1px solid #35414c",

          color:
            "#c7ced5",

          fontSize:
            "10px",

          fontWeight:
            "800",

          cursor:
            "pointer",
        }}
      >
        {text}
      </button>
    </form>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div
      style={{
        padding:
          "11px",

        background:
          "#0b1117",

        border:
          "1px solid #242e38",

        borderRadius:
          "10px",
      }}
    >
      <div
        style={{
          color:
            "#67727d",

          fontSize:
            "9px",

          fontWeight:
            "800",

          marginBottom:
            "5px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color:
            "#adb5bd",

          fontSize:
            "10px",

          overflow:
            "hidden",

          textOverflow:
            "ellipsis",

          whiteSpace:
            "nowrap",
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}