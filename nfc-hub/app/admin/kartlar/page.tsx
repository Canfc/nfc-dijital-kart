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

export const revalidate = 0;

type CardRoute = {
  code: string;
  business: string;
  destination_url: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

type BusinessRow = {
  name: string;
  slug: string;
  active: boolean;
  status: string | null;
};

export default async function KartlarPage() {
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
    routesResult,
    businessesResult,
  ] = await Promise.all([
    supabase
      .from("nfc_routes")
      .select(`
        code,
        business,
        destination_url,
        active,
        created_at,
        updated_at
      `)
      .order(
        "created_at",
        {
          ascending: false,
        }
      ),

    supabase
      .from("businesses")
      .select(`
        name,
        slug,
        active,
        status
      `),
  ]);

  if (routesResult.error) {
    console.error(
      "Kartlar alınamadı:",
      routesResult.error
    );
  }

  if (businessesResult.error) {
    console.error(
      "İşletmeler alınamadı:",
      businessesResult.error
    );
  }

  const cards =
    (routesResult.data ??
      []) as CardRoute[];

  const businesses =
    (businessesResult.data ??
      []) as BusinessRow[];

  const activeCards =
    cards.filter(
      (card) => card.active
    ).length;

  const passiveCards =
    cards.length -
    activeCards;

  const businessCount =
    new Set(
      cards.map(
        (card) =>
          card.business
      )
    ).size;

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
          "34px 18px 70px",

        boxSizing:
          "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1220px",
          margin: "0 auto",
        }}
      >
        {/* =========================
            ÜST MENÜ
        ========================= */}

        <div
          style={{
            display: "flex",

            alignItems: "center",

            justifyContent:
              "space-between",

            gap: "15px",

            flexWrap: "wrap",

            marginBottom: "27px",
          }}
        >
          <div>
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
              NFC Kartları
            </h1>

            <p
              style={{
                color: "#84909b",

                fontSize: "13px",

                margin:
                  "8px 0 0",
              }}
            >
              Tüm fiziksel NFC
              kartlarını tek
              merkezden yönetin.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <TopLink
              href="/admin/yeni-isletme"
              text="+ Yeni İşletme"
            />

            <TopLink
              href="/admin/isletmeler"
              text="İşletmeler"
            />

            <TopLink
              href="/admin/istatistikler"
              text="İstatistikler"
            />
          </div>
        </div>

        {/* =========================
            GENEL SAYILAR
        ========================= */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(160px, 1fr))",

            gap: "11px",

            marginBottom: "25px",
          }}
        >
          <Metric
            label="Toplam Kart"
            value={cards.length}
          />

          <Metric
            label="Aktif Kart"
            value={activeCards}
          />

          <Metric
            label="Pasif Kart"
            value={passiveCards}
          />

          <Metric
            label="İşletme"
            value={businessCount}
          />
        </div>

        {/* =========================
            BİLGİ
        ========================= */}

        <div
          style={{
            padding:
              "14px 16px",

            marginBottom:
              "18px",

            borderRadius:
              "13px",

            background:
              "#211b10",

            border:
              "1px solid #5e491e",

            color:
              "#cdb77e",

            fontSize:
              "11px",

            lineHeight: 1.6,
          }}
        >
          Fiziksel karta yazılan
          merkezi NFC adresi
          değişmez. Buradaki hedef
          adresi değiştirdiğinizde
          kartın yönlendirmesi
          uzaktan değiştirilebilir.
        </div>

        {/* =========================
            KARTLAR
        ========================= */}

        <div
          style={{
            display: "grid",
            gap: "13px",
          }}
        >
          {cards.map(
            (card) => {
              const business =
                businesses.find(
                  (item) =>
                    item.name ===
                    card.business
                );

              return (
                <CardPanel
                  key={card.code}
                  card={card}
                  business={
                    business
                  }
                />
              );
            }
          )}

          {!cards.length && (
            <div
              style={{
                padding: "40px",

                textAlign:
                  "center",

                borderRadius:
                  "18px",

                background:
                  "#10171e",

                border:
                  "1px solid #28333d",

                color:
                  "#77828c",
              }}
            >
              Henüz NFC kartı
              bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* =========================
   KART PANELİ
========================= */

function CardPanel({
  card,
  business,
}: {
  card: CardRoute;
  business?: BusinessRow;
}) {
  const centralUrl =
    `https://nfc-hub-omega.vercel.app/go/${card.code}`;

  const isCentralBusiness =
    card.destination_url.includes(
      "nfc-hub-omega.vercel.app/business/"
    );

  return (
    <section
      style={{
        padding: "20px",

        borderRadius: "18px",

        background:
          "linear-gradient(145deg, #111820, #0d1319)",

        border:
          "1px solid #28333d",

        boxShadow:
          "0 16px 40px rgba(0,0,0,.16)",
      }}
    >
      {/* BAŞLIK */}

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",

          gap: "15px",

          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",

            alignItems:
              "center",

            gap: "13px",
          }}
        >
          <div
            style={{
              minWidth: "58px",

              height: "58px",

              display: "grid",

              placeItems:
                "center",

              borderRadius:
                "15px",

              background:
                "#2b2212",

              border:
                "1px solid #695326",

              color:
                "#e1b75e",

              fontSize:
                "12px",

              fontWeight:
                "900",
            }}
          >
            {card.code}
          </div>

          <div>
            <div
              style={{
                fontSize:
                  "17px",

                fontWeight:
                  "900",
              }}
            >
              {card.business}
            </div>

            <div
              style={{
                marginTop:
                  "5px",

                color:
                  "#717d87",

                fontSize:
                  "10px",
              }}
            >
              {business
                ? `/business/${business.slug}`
                : "Harici / eski sistem yönlendirmesi"}
            </div>
          </div>
        </div>

        <StatusBadge
          active={card.active}
        />
      </div>

      {/* URL BİLGİLERİ */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",

          gap: "10px",

          marginTop: "18px",
        }}
      >
        <UrlBox
          label="FİZİKSEL KARTA YAZILACAK SABİT URL"
          value={centralUrl}
        />

        <UrlBox
          label="MEVCUT HEDEF"
          value={
            card.destination_url
          }
        />
      </div>

      {/* DURUM */}

      <div
        style={{
          display: "flex",

          gap: "8px",

          flexWrap: "wrap",

          marginTop: "15px",
        }}
      >
        <InfoBadge
          text={
            isCentralBusiness
              ? "Merkezi İşletme"
              : "Harici Yönlendirme"
          }
        />

        {business && (
          <InfoBadge
            text={
              business.status ===
              "archived"
                ? "İşletme Arşivde"
                : business.active
                  ? "İşletme Aktif"
                  : "İşletme Pasif"
            }
          />
        )}
      </div>

      {/* =========================
          HEDEF DEĞİŞTİR
      ========================= */}

      <div
        style={{
          marginTop: "20px",

          paddingTop: "18px",

          borderTop:
            "1px solid #252f38",
        }}
      >
        <div
          style={{
            marginBottom:
              "9px",

            color: "#d8dee4",

            fontSize: "11px",

            fontWeight:
              "900",
          }}
        >
          YÖNLENDİRME HEDEFİ
        </div>

        <form
          action="/api/cards/destination"
          method="POST"
          style={{
            display: "grid",

            gridTemplateColumns:
              "minmax(0, 1fr) auto",

            gap: "8px",
          }}
          className="target-form"
        >
          <input
            type="hidden"
            name="code"
            value={card.code}
          />

          <input
            type="url"
            name="destination"
            defaultValue={
              card.destination_url
            }
            required
            placeholder="https://..."
            style={{
              width: "100%",

              minWidth: 0,

              boxSizing:
                "border-box",

              padding:
                "12px 13px",

              borderRadius:
                "10px",

              background:
                "#0a1015",

              border:
                "1px solid #303b45",

              color:
                "#ffffff",

              outline: "none",

              fontSize: "11px",
            }}
          />

          <button
            type="submit"
            style={{
              padding:
                "12px 16px",

              borderRadius:
                "10px",

              border:
                "1px solid #dfb456",

              background:
                "linear-gradient(135deg, #c59134, #efca69)",

              color:
                "#171109",

              fontSize:
                "10px",

              fontWeight:
                "900",

              cursor:
                "pointer",
            }}
          >
            Hedefi Değiştir
          </button>
        </form>
      </div>

      {/* =========================
          ALT BUTONLAR
      ========================= */}

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          gap: "10px",

          alignItems:
            "center",

          flexWrap: "wrap",

          marginTop: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "7px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={centralUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={secondaryButton}
          >
            NFC Linkini Test Et
          </a>

          <a
            href={`/admin/istatistikler`}
            style={secondaryButton}
          >
            İstatistikler
          </a>
        </div>

        <form
          action="/api/cards/status"
          method="POST"
        >
          <input
            type="hidden"
            name="code"
            value={card.code}
          />

          <input
            type="hidden"
            name="active"
            value={
              card.active
                ? "false"
                : "true"
            }
          />

          <button
            type="submit"
            style={{
              padding:
                "10px 14px",

              borderRadius:
                "9px",

              cursor:
                "pointer",

              fontSize:
                "10px",

              fontWeight:
                "900",

              color:
                card.active
                  ? "#f3a8ad"
                  : "#7ee2a5",

              background:
                card.active
                  ? "#291417"
                  : "#10251a",

              border:
                card.active
                  ? "1px solid #69343a"
                  : "1px solid #28583f",
            }}
          >
            {card.active
              ? "Kartı Pasife Al"
              : "Kartı Aktif Et"}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 650px) {
          .target-form {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
   ÜST METRİK
========================= */

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      style={{
        padding:
          "17px",

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
          color:
            "#75818b",

          fontSize:
            "10px",

          fontWeight:
            "700",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop:
            "7px",

          color:
            "#ffffff",

          fontSize:
            "25px",

          fontWeight:
            "900",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================
   URL KUTUSU
========================= */

function UrlBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding:
          "12px",

        borderRadius:
          "11px",

        background:
          "#0a1015",

        border:
          "1px solid #25303a",
      }}
    >
      <div
        style={{
          color:
            "#626e78",

          fontSize:
            "8px",

          fontWeight:
            "900",

          letterSpacing:
            ".05em",

          marginBottom:
            "6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color:
            "#aab4bc",

          fontSize:
            "10px",

          lineHeight: 1.5,

          overflowWrap:
            "anywhere",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================
   AKTİF/PASİF
========================= */

function StatusBadge({
  active,
}: {
  active: boolean;
}) {
  return (
    <span
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
          active
            ? "#66da95"
            : "#e19772",

        background:
          active
            ? "#0e2218"
            : "#251713",

        border:
          active
            ? "1px solid #28583f"
            : "1px solid #5c3729",
      }}
    >
      {active
        ? "AKTİF"
        : "PASİF"}
    </span>
  );
}

/* =========================
   BİLGİ ETİKETİ
========================= */

function InfoBadge({
  text,
}: {
  text: string;
}) {
  return (
    <span
      style={{
        padding:
          "6px 9px",

        borderRadius:
          "8px",

        color:
          "#8e99a3",

        background:
          "#0c1217",

        border:
          "1px solid #252f38",

        fontSize:
          "9px",

        fontWeight:
          "700",
      }}
    >
      {text}
    </span>
  );
}

/* =========================
   ÜST LİNK
========================= */

function TopLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <a
      href={href}
      style={{
        padding:
          "10px 13px",

        borderRadius:
          "9px",

        background:
          "#111820",

        border:
          "1px solid #303b45",

        color:
          "#b7c0c8",

        textDecoration:
          "none",

        fontSize:
          "10px",

        fontWeight:
          "800",
      }}
    >
      {text}
    </a>
  );
}

const secondaryButton = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: "9px",
  background: "#111820",
  border: "1px solid #303b45",
  color: "#aeb8c1",
  textDecoration: "none",
  fontSize: "10px",
  fontWeight: "800",
};
// deployment trigger
// production deploy 2
