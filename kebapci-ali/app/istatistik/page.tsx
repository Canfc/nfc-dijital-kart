import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function IstatistikPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!
  );

  // Tekil ziyaretçi sayısı
  const { count } = await supabase
    .from("visits")
    .select("*", { count: "exact", head: true })
    .eq("business", "Kebapçı Ali");

  // Son ziyaret
  const { data: lastVisit } = await supabase
    .from("visits")
    .select("turkiye_saati")
    .eq("business", "Kebapçı Ali")
    .order("turkiye_saati", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Sayaç dönemi
  const { data: settings } = await supabase
    .from("counter_settings")
    .select("counter_version")
    .eq("business", "Kebapçı Ali")
    .maybeSingle();

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
        {count ?? 0}
      </div>

      <h3>🇹🇷 Son Ziyaret</h3>
      <p>{sonZiyaret}</p>

      <h3>🔄 Sayaç Dönemi</h3>
      <p>{settings?.counter_version ?? "-"}</p>
    </main>
  );
}