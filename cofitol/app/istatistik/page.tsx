import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function IstatistikPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  /* =========================
     GİRİŞ EKRANI
  ========================= */

  if (adminSession !== "authenticated") {
    return (
      <main
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #24211a 0%, #111315 35%, #08090b 100%)",
          color: "#f7f7f7",
          fontFamily: "Arial, Helvetica, sans-serif",
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
            border: "1px solid #30343a",
            borderRadius: "22px",
            padding: "34px 28px",
            boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#221d13",
              border: "1px solid #6f5929",
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
              letterSpacing: "0.14em",
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
            Coffitol Coffee House
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "#aeb4bd",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            İstatistikleri görüntülemek için yönetici şifrenizi girin.
          </p>

          <form action="/api/admin-login" method="POST">
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginTop: "26px",
                marginBottom: "8px",
                color: "#d7dbe0",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Yönetici şifresi
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Şifrenizi girin"
              required
              style={{
                width: "100%",
                padding: "15px 16px",
                boxSizing: "border-box",
                borderRadius: "12px",
                border: "1px solid #3a3f46",
                outline: "none",
                background: "#0d0f12",
                color: "#ffffff",
                fontSize: "16px",
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

  const business = "Coffitol Coffee House";

  const { data: settings } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .maybeSingle();

  const currentVersion = settings?.counter_version ?? 1;

  const { count: visitorCount } = await supabase
    .from("visits")
    .select("*", { count: "exact", head: true })
    .eq("business", business)
    .eq("counter_version", currentVersion);

  const { data: lastVisit } = await supabase
    .from("visits")
    .select("turkiye_saati")
    .eq("business", business)
    .eq("counter_version", currentVersion)
    .order("turkiye_saati", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: clicks } = await supabase
    .from("link_clicks")
    .select("link_name")
    .eq("business", business)
    .eq("counter_version", currentVersion);

  const googleCount =
    clicks?.filter((item) => item.link_name === "google").length ?? 0;

  const instagramCount =
    clicks?.filter((item) => item.link_name === "instagram").length ?? 0;

  const konumCount =
    clicks?.filter((item) => item.link_name === "konum").length ?? 0;

  const telefonCount =
    clicks?.filter((item) => item.link_name === "telefon").length ?? 0;

  const sonZiyaret = lastVisit?.turkiye_saati
    ? new Date(lastVisit.turkiye_saati).toLocaleString("tr-TR", {
        dateStyle: "short",
        timeStyle: "medium",
      })
    : "Henüz ziyaret yok";

  const totalInteractions =
    googleCount + instagramCount + konumCount + telefonCount;

  /* =========================
     PANEL
  ========================= */

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #201d16 0%, #0d0f12 32%, #08090b 100%)",
        color: "#f5f7fa",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "32px 18px 60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        {/* ÜST BAŞLIK */}
        <header
          style={{
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "54px",
                height: "54px",
                flexShrink: 0,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#211d14",
                border: "1px solid #655226",
                fontSize: "25px",
              }}
            >
              ☕
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 5px",
                  color: "#d4a853",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.15em",
                }}
              >
                İSTATİSTİK PANELİ
              </p>

              <h1
                style={{
                  margin: 0,
                  fontSize: "27px",
                  lineHeight: 1.15,
                  color: "#ffffff",
                }}
              >
                Coffitol Coffee House
              </h1>
            </div>
          </div>

          <p
            style={{
              color: "#a7afb9",
              margin: "14px 0 0",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            NFC kartınızın güncel ziyaret ve bağlantı etkileşimleri.
          </p>
        </header>

        {/* ANA ZİYARETÇİ KARTI */}
        <section
          style={{
            padding: "24px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #1c1b17 0%, #15181c 55%, #111315 100%)",
            border: "1px solid #554521",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "15px",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#aeb4bd",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                }}
              >
                TEKİL ZİYARETÇİ
              </p>

              <div
                style={{
                  marginTop: "9px",
                  fontSize: "58px",
                  lineHeight: 1,
                  fontWeight: "800",
                  color: "#ffffff",
                  letterSpacing: "-0.04em",
                }}
              >
                {visitorCount ?? 0}
              </div>
            </div>

            <div
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                background: "#15251c",
                border: "1px solid #285a39",
                color: "#6ee7a0",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              Aktif
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "#30343a",
              margin: "22px 0 17px",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  color: "#8e96a1",
                  fontSize: "11px",
                  marginBottom: "5px",
                }}
              >
                Son ziyaret
              </div>

              <div
                style={{
                  color: "#f4f4f5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {sonZiyaret}
              </div>
            </div>

            <div>
              <div
                style={{
                  color: "#8e96a1",
                  fontSize: "11px",
                  marginBottom: "5px",
                }}
              >
                Sayaç dönemi
              </div>

              <div
                style={{
                  color: "#d4a853",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                #{currentVersion}
              </div>
            </div>
          </div>
        </section>

        {/* ETKİLEŞİM BAŞLIĞI */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: "15px",
            margin: "28px 2px 13px",
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
              Link Etkileşimleri
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#8e96a1",
                fontSize: "12px",
              }}
            >
              Ziyaretçilerin bağlantı tercihleri
            </p>
          </div>

          <div
            style={{
              color: "#d4a853",
              fontWeight: "800",
              fontSize: "20px",
            }}
          >
            {totalInteractions}
          </div>
        </div>

        {/* ETKİLEŞİM KARTLARI */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
            gap: "12px",
          }}
        >
          <StatCard
            icon="⭐"
            title="Google Yorum"
            value={googleCount}
          />

          <StatCard
            icon="📸"
            title="Instagram"
            value={instagramCount}
          />

          <StatCard
            icon="📍"
            title="Konum"
            value={konumCount}
          />

          <StatCard
            icon="📞"
            title="Telefon"
            value={telefonCount}
          />
        </section>

        {/* SON ZİYARET DETAYI */}
        <section
          style={{
            marginTop: "18px",
            padding: "20px",
            borderRadius: "17px",
            background: "#15181d",
            border: "1px solid #2a2f36",
          }}
        >
          <div
            style={{
              color: "#8f97a2",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              marginBottom: "8px",
            }}
          >
            SON ZİYARET
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: "17px",
              lineHeight: 1.4,
              fontWeight: "600",
            }}
          >
            {sonZiyaret}
          </div>
        </section>

        {/* SIFIRLAMA */}
        <section
          style={{
            marginTop: "28px",
            padding: "20px",
            borderRadius: "17px",
            background: "#181315",
            border: "1px solid #512b30",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "15px",
              marginBottom: "5px",
            }}
          >
            Sayaç Yönetimi
          </div>

          <p
            style={{
              margin: "0 0 16px",
              color: "#a69a9c",
              fontSize: "12px",
              lineHeight: 1.5,
            }}
          >
            Sayaç sıfırlandığında yeni bir istatistik dönemi başlatılır.
          </p>

          <form action="/api/reset-counter" method="POST">
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "#c53d45",
                color: "#ffffff",
                border: "1px solid #e15960",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "800",
                fontSize: "14px",
              }}
            >
              Sayacı Sıfırla
            </button>
          </form>
        </section>

        <footer
          style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#686f79",
            fontSize: "11px",
          }}
        >
          Coffitol Coffee House • NFC İstatistik Sistemi
        </footer>
      </div>
    </main>
  );
}

/* =========================
   İSTATİSTİK KARTI
========================= */

function StatCard({
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
        minHeight: "125px",
        padding: "17px",
        borderRadius: "17px",
        background: "#15181d",
        border: "1px solid #2a2f36",
        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          fontSize: "21px",
          marginBottom: "14px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#9ea6b1",
          fontSize: "12px",
          marginBottom: "7px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#ffffff",
          fontSize: "28px",
          lineHeight: 1,
          fontWeight: "800",
        }}
      >
        {value}
      </div>
    </div>
  );
}