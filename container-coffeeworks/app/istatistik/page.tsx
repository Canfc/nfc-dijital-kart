import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const cardCodes = [
  "CON01",
  "CON02",
  "CON03",
  "CON04",
  "CON05",
];

export default async function IstatistikPage() {
  const cookieStore = await cookies();

  const adminSession =
    cookieStore.get("admin_session")?.value;

  /* =========================
     GİRİŞ
  ========================= */

  if (adminSession !== "authenticated") {
    return (
      <main
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #24211a 0%, #111315 35%, #08090b 100%)",
          color: "#f7f7f7",
          fontFamily:
            "Arial, Helvetica, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#15181c",
            border:
              "1px solid #30343a",
            borderRadius: "22px",
            padding: "34px 28px",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              background: "#221d13",
              border:
                "1px solid #6f5929",
              fontSize: "26px",
              marginBottom: "22px",
            }}
          >
            ☕
          </div>

          <p
            style={{
              margin: "0 0 8px",
              color: "#d4a853",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing:
                "0.14em",
            }}
          >
            YÖNETİM PANELİ
          </p>

          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "28px",
              lineHeight: 1.2,
            }}
          >
            Container Coffee Works
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "#aeb4bd",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            İstatistikleri görüntülemek
            için yönetici şifrenizi girin.
          </p>

          <form
            action="/api/admin-login"
            method="POST"
          >
            <input
              type="password"
              name="password"
              placeholder="Şifrenizi girin"
              required
              style={{
                width: "100%",
                padding: "15px 16px",
                boxSizing:
                  "border-box",
                borderRadius: "12px",
                border:
                  "1px solid #3a3f46",
                outline: "none",
                background: "#0d0f12",
                color: "#ffffff",
                fontSize: "16px",
                marginTop: "26px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "14px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                color: "#111111",
                background: "#d4a853",
                border: "none",
                borderRadius: "12px",
              }}
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </main>
    );
  }

  /* =========================
     SUPABASE
  ========================= */

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business =
    "Container Coffee Works";

  const { data: settings } =
    await supabase
      .from("counter_settings")
      .select("counter_version")
      .eq("business", business)
      .maybeSingle();

  const currentVersion =
    settings?.counter_version ?? 1;

  /* =========================
     TOPLAM ZİYARET
  ========================= */

  const { count: visitorCount } =
    await supabase
      .from("visits")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("business", business)
      .eq(
        "counter_version",
        currentVersion
      );

  /* =========================
     KART ZİYARETLERİ
  ========================= */

  const cardVisitResults =
    await Promise.all(
      cardCodes.map((code) =>
        supabase
          .from("visits")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("business", business)
          .eq(
            "counter_version",
            currentVersion
          )
          .eq("card_code", code)
      )
    );

  const cardVisitCounts:
    Record<string, number> = {};

  cardCodes.forEach(
    (code, index) => {
      cardVisitCounts[code] =
        cardVisitResults[index].count ??
        0;
    }
  );

  /* =========================
     SON ZİYARET
  ========================= */

  const { data: lastVisit } =
    await supabase
      .from("visits")
      .select("turkiye_saati")
      .eq("business", business)
      .eq(
        "counter_version",
        currentVersion
      )
      .order("turkiye_saati", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  /* =========================
     TÜM LINK TIKLAMALARI
  ========================= */

  const { data: clicks } =
    await supabase
      .from("link_clicks")
      .select(
        "link_name, card_code"
      )
      .eq("business", business)
      .eq(
        "counter_version",
        currentVersion
      );

  const allClicks = clicks ?? [];

  const googleCount =
    allClicks.filter(
      (item) =>
        item.link_name === "google"
    ).length;

  const instagramCount =
    allClicks.filter(
      (item) =>
        item.link_name ===
        "instagram"
    ).length;

  const konumCount =
    allClicks.filter(
      (item) =>
        item.link_name === "konum"
    ).length;

  const telefonCount =
    allClicks.filter(
      (item) =>
        item.link_name ===
        "telefon"
    ).length;

  const totalInteractions =
    googleCount +
    instagramCount +
    konumCount +
    telefonCount;

  /* =========================
     KART BAZLI LINKLER
  ========================= */

  function getCardClicks(
    cardCode: string,
    linkName: string
  ) {
    return allClicks.filter(
      (item) =>
        item.card_code === cardCode &&
        item.link_name === linkName
    ).length;
  }

  const sonZiyaret =
    lastVisit?.turkiye_saati
      ? new Date(
          lastVisit.turkiye_saati
        ).toLocaleString("tr-TR", {
          dateStyle: "short",
          timeStyle: "medium",
        })
      : "Henüz ziyaret yok";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #201d16 0%, #0d0f12 32%, #08090b 100%)",
        color: "#f5f7fa",
        fontFamily:
          "Arial, Helvetica, sans-serif",
        padding: "32px 18px 60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <header
          style={{
            marginBottom: "26px",
          }}
        >
          <p
            style={{
              margin: "0 0 6px",
              color: "#d4a853",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing:
                "0.15em",
            }}
          >
            NFC İSTATİSTİK PANELİ
          </p>

          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: "28px",
            }}
          >
            ☕ Container Coffee Works
          </h1>

          <p
            style={{
              color: "#a7afb9",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            5 fiziksel NFC kartın ayrı
            performans analizi
          </p>
        </header>

        {/* GENEL ÖZET */}

        <section
          style={{
            padding: "24px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #1c1b17 0%, #15181c 55%, #111315 100%)",
            border:
              "1px solid #554521",
            marginBottom: "28px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#aeb4bd",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            TOPLAM TEKİL ZİYARET
          </p>

          <div
            style={{
              color: "#ffffff",
              fontSize: "58px",
              fontWeight: "800",
              marginTop: "8px",
            }}
          >
            {visitorCount ?? 0}
          </div>

          <div
            style={{
              height: "1px",
              background: "#30343a",
              margin: "20px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <small
                style={{
                  color: "#8e96a1",
                }}
              >
                Son ziyaret
              </small>

              <div
                style={{
                  marginTop: "5px",
                  color: "#ffffff",
                }}
              >
                {sonZiyaret}
              </div>
            </div>

            <div>
              <small
                style={{
                  color: "#8e96a1",
                }}
              >
                Sayaç dönemi
              </small>

              <div
                style={{
                  marginTop: "5px",
                  color: "#d4a853",
                  fontWeight: "700",
                }}
              >
                #{currentVersion}
              </div>
            </div>
          </div>
        </section>

        {/* 5 AYRI KART PANELİ */}

        <h2
          style={{
            color: "#ffffff",
            fontSize: "19px",
            marginBottom: "15px",
          }}
        >
          Kart Performansı
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "14px",
          }}
        >
          {cardCodes.map(
            (cardCode, index) => (
              <CardPerformancePanel
                key={cardCode}
                code={cardCode}
                title={`Kart ${index + 1}`}
                visits={
                  cardVisitCounts[
                    cardCode
                  ] ?? 0
                }
                google={getCardClicks(
                  cardCode,
                  "google"
                )}
                instagram={getCardClicks(
                  cardCode,
                  "instagram"
                )}
                konum={getCardClicks(
                  cardCode,
                  "konum"
                )}
                telefon={getCardClicks(
                  cardCode,
                  "telefon"
                )}
              />
            )
          )}
        </div>

        {/* TOPLAM ETKİLEŞİM */}

        <section
          style={{
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "13px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "18px",
                }}
              >
                Toplam Etkileşimler
              </h2>

              <p
                style={{
                  color: "#8e96a1",
                  fontSize: "12px",
                  margin: "5px 0 0",
                }}
              >
                Beş kartın toplamı
              </p>
            </div>

            <strong
              style={{
                color: "#d4a853",
                fontSize: "23px",
              }}
            >
              {totalInteractions}
            </strong>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(145px, 1fr))",
              gap: "12px",
            }}
          >
            <TotalStat
              icon="⭐"
              title="Google"
              value={googleCount}
            />

            <TotalStat
              icon="📸"
              title="Instagram"
              value={instagramCount}
            />

            <TotalStat
              icon="📍"
              title="Konum"
              value={konumCount}
            />

            <TotalStat
              icon="📞"
              title="Telefon"
              value={telefonCount}
            />
          </div>
        </section>

        {/* RESET */}

        <section
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "17px",
            background: "#181315",
            border:
              "1px solid #512b30",
          }}
        >
          <strong>
            Sayaç Yönetimi
          </strong>

          <p
            style={{
              color: "#a69a9c",
              fontSize: "12px",
              lineHeight: 1.5,
            }}
          >
            Bu işlem beş kart için de
            yeni sayaç dönemi başlatır.
          </p>

          <form
            action="/api/reset-counter"
            method="POST"
          >
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "#c53d45",
                color: "#ffffff",
                border:
                  "1px solid #e15960",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "800",
              }}
            >
              Tüm Sayaçları Sıfırla
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

/* =========================
   FİZİKSEL KART PANELİ
========================= */

function CardPerformancePanel({
  code,
  title,
  visits,
  google,
  instagram,
  konum,
  telefon,
}: {
  code: string;
  title: string;
  visits: number;
  google: number;
  instagram: number;
  konum: number;
  telefon: number;
}) {
  const interactions =
    google +
    instagram +
    konum +
    telefon;

  return (
    <section
      style={{
        padding: "20px",
        borderRadius: "19px",
        background:
          "linear-gradient(145deg, #1b1915 0%, #13161a 65%, #101215 100%)",
        border:
          "1px solid #493c22",
        boxShadow:
          "0 12px 28px rgba(0,0,0,.22)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              color: "#d4a853",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing:
                "0.12em",
            }}
          >
            {code}
          </div>

          <h3
            style={{
              color: "#ffffff",
              margin: "6px 0 0",
              fontSize: "17px",
            }}
          >
            {title}
          </h3>
        </div>

        <div
          style={{
            color: "#6ee7a0",
            fontSize: "10px",
            fontWeight: "700",
            background: "#15251c",
            border:
              "1px solid #285a39",
            padding: "6px 9px",
            borderRadius: "999px",
          }}
        >
          AKTİF
        </div>
      </div>

      <div
        style={{
          marginTop: "19px",
          paddingBottom: "17px",
          borderBottom:
            "1px solid #30343a",
        }}
      >
        <div
          style={{
            color: "#8f97a2",
            fontSize: "11px",
          }}
        >
          Tekil ziyaret
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: "38px",
            lineHeight: 1,
            fontWeight: "800",
            marginTop: "7px",
          }}
        >
          {visits}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "9px",
          marginTop: "15px",
        }}
      >
        <MiniStat
          label="⭐ Google"
          value={google}
        />

        <MiniStat
          label="📸 Instagram"
          value={instagram}
        />

        <MiniStat
          label="📍 Konum"
          value={konum}
        />

        <MiniStat
          label="📞 Telefon"
          value={telefon}
        />
      </div>

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent:
            "space-between",
          color: "#8f97a2",
          fontSize: "11px",
        }}
      >
        <span>Toplam etkileşim</span>

        <strong
          style={{
            color: "#d4a853",
          }}
        >
          {interactions}
        </strong>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      style={{
        background: "#101216",
        border:
          "1px solid #292d33",
        borderRadius: "11px",
        padding: "11px",
      }}
    >
      <div
        style={{
          color: "#8f97a2",
          fontSize: "10px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#ffffff",
          fontSize: "20px",
          fontWeight: "800",
          marginTop: "6px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function TotalStat({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: number;
}) {
  return (
    <div
      style={{
        background: "#15181d",
        border:
          "1px solid #2a2f36",
        borderRadius: "15px",
        padding: "16px",
      }}
    >
      <div>{icon}</div>

      <div
        style={{
          color: "#9ea6b1",
          fontSize: "11px",
          marginTop: "10px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#ffffff",
          fontSize: "27px",
          fontWeight: "800",
          marginTop: "6px",
        }}
      >
        {value}
      </div>
    </div>
  );
}