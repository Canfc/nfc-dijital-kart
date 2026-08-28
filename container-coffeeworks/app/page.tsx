export default function Home() {
  return (
    <main className="min-h-[100svh] bg-[#2e1d12]">
      <div className="relative mx-auto h-[100svh] w-full max-w-[520px] overflow-hidden bg-[#2e1d12]">

        {/* ANA TASARIM */}
        <img
          src="/container-panel.png"
          alt="Container Coffee Works"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* GOOGLE */}
        <a
          href="/click?link=google"
          aria-label="Google'da Yorum Yap"
          className="absolute left-[13%] top-[45.2%] z-20 h-[7.7%] w-[74%] rounded-[24px]"
        />

        {/* INSTAGRAM */}
        <a
          href="/click?link=instagram"
          aria-label="Instagram"
          className="absolute left-[13%] top-[54%] z-20 h-[7.7%] w-[74%] rounded-[24px]"
        />

        {/* KONUM */}
        <a
          href="/click?link=konum"
          aria-label="Konum"
          className="absolute left-[13%] top-[62.8%] z-20 h-[7.7%] w-[74%] rounded-[24px]"
        />

        {/* TELEFON */}
        <a
          href="/click?link=telefon"
          aria-label="Bizi Ara"
          className="absolute left-[13%] top-[71.6%] z-20 h-[7.7%] w-[74%] rounded-[24px]"
        />

      </div>
    </main>
  );
}