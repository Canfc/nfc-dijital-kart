import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function IstatistikPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  if (adminSession !== "authenticated") {
    return (
      <main
        style={{
          maxWidth: "400px",
          margin: "100px auto",
          padding: "30px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Yemliha Gerek</h1>
        <h2>İstatistik Girişi</h2>

        <form action="/api/admin-login" method="POST">
          <input
            type="password"
            name="password"
            placeholder="Şifrenizi girin"
            required
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "20px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Giriş Yap
          </button>
        </form>
      </main>
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business = "Yemliha Gerek";

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

  const yemlihaCount =
    clicks?.filter((item) => item.link_name === "yemlihagerek").length ?? 0;

  const cadirKeyfiCount =
    clicks?.filter((item) => item.link_name === "cadirkeyfi").length ?? 0;

  const marmaraFestCount =
    clicks?.filter((item) => item.link_name === "marmarafest").length ?? 0;

  const kocaeliPlaniCount =
    clicks?.filter((item) => item.link_name === "kocaeliplani").length ?? 0;

  const voleybolCount =
    clicks?.filter((item) => item.link_name === "cadirkeyfivoleybol").length ??
    0;

  const sonZiyaret = lastVisit?.turkiye_saati
    ? new Date(lastVisit.turkiye_saati).toLocaleString("tr-TR", {
        dateStyle: "short",
        timeStyle: "medium",
      })
    : "Henüz ziyaret yok";

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "60px auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Yemliha Gerek</h1>
      <h2>Kişisel Kart İstatistikleri</h2>

      <hr />

      <h3>👥 Tekil Ziyaretçi</h3>

      <div
        style={{
          fontSize: "52px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        {visitorCount ?? 0}
      </div>

      <h3>📸 Instagram Etkileşimleri</h3>

      <p>@yemlihagerek: {yemlihaCount}</p>
      <p>@cadirkeyfi: {cadirKeyfiCount}</p>
      <p>@marmarafest: {marmaraFestCount}</p>
      <p>@kocaeliplani: {kocaeliPlaniCount}</p>
      <p>@cadirkeyfivoleybol: {voleybolCount}</p>

      <h3>🇹🇷 Son Ziyaret</h3>
      <p>{sonZiyaret}</p>

      <h3>🔄 Sayaç Dönemi</h3>
      <p>{currentVersion}</p>

      <form action="/api/reset-counter" method="POST">
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "14px 22px",
            backgroundColor: "#111111",
            color: "#d4af37",
            border: "1px solid #d4af37",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Sayacı Sıfırla
        </button>
      </form>
    </main>
  );
}