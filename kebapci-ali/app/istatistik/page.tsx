import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function IstatistikPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  const business = "Kebapçı Ali";

  // Tekil ziyaretçi sayısı
  const { count: visitorCount } = await supabase
    .from("visits")
    .select("*", { count: "exact", head: true })
    .eq("business", business);

  // Son ziyaret
  const { data: lastVisit } = await supabase
    .from("visits")
    .select("turkiye_saati")
    .eq("business", business)
    .order("turkiye_saati", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Sayaç dönemi
  const { data: settings } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", business)
    .maybeSingle();

  const currentVersion = settings?.counter_version ?? 1;

  // Link tıklamaları
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

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "60px auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Kebapçı Ali</h1>
      <h2>İstatistik Paneli</h2>

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

      <h3>🔗 Link Etkileşimleri</h3>

      <p>⭐ Google Yorum: {googleCount}</p>
      <p>📸 Instagram: {instagramCount}</p>
      <p>📍 Konum: {konumCount}</p>
      <p>📞 Telefon: {telefonCount}</p>

      <h3>🇹🇷 Son Ziyaret</h3>
      <p>{sonZiyaret}</p>

      <h3>🔄 Sayaç Dönemi</h3>
      <p>{currentVersion}</p>
    </main>
  );
}