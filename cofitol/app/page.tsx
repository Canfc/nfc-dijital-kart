export default function Home() {
  return (
    <main className="min-h-[100svh] bg-[#2b220d]">
      <div className="relative mx-auto h-[100svh] w-full max-w-[430px] overflow-hidden">

        <img
          src="/cofitol-panel.png"
          alt="Coffitol Coffee House"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* GOOGLE */}
        <a
          href="/click?link=google"
          aria-label="Google Yorum"
          className="absolute left-[5%] top-[39.5%] z-20 h-[22%] w-[22%]"
        />

        {/* INSTAGRAM */}
        <a
          href="/click?link=instagram"
          aria-label="Instagram"
          className="absolute left-[28.5%] top-[39.5%] z-20 h-[22%] w-[22%]"
        />

        {/* KONUM */}
        <a
          href="/click?link=konum"
          aria-label="Konum"
          className="absolute left-[52%] top-[39.5%] z-20 h-[22%] w-[22%]"
        />

        {/* TELEFON */}
        <a
          href="/click?link=telefon"
          aria-label="Telefon"
          className="absolute left-[75.5%] top-[39.5%] z-20 h-[22%] w-[19%]"
        />

      </div>
    </main>
  );
}