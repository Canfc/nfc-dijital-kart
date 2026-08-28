import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e9ddca]">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="relative w-full aspect-[853/1844] overflow-hidden">
          <Image
            src="/container-panel.png"
            alt="Container Coffee Works"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* GOOGLE */}
          <a
            href="/click?link=google"
            aria-label="Google'da Yorum Yap"
            className="absolute left-[12.5%] top-[42.8%] z-20 h-[7.5%] w-[74.8%] rounded-[24px]"
          />

          {/* INSTAGRAM */}
          <a
            href="/click?link=instagram"
            aria-label="Instagram"
            className="absolute left-[12.5%] top-[51.8%] z-20 h-[7.5%] w-[74.8%] rounded-[24px]"
          />

          {/* KONUM */}
          <a
            href="/click?link=konum"
            aria-label="Konum"
            className="absolute left-[12.5%] top-[60.8%] z-20 h-[7.5%] w-[74.8%] rounded-[24px]"
          />

          {/* TELEFON */}
          <a
            href="/click?link=telefon"
            aria-label="Bizi Ara"
            className="absolute left-[12.5%] top-[69.8%] z-20 h-[7.5%] w-[74.8%] rounded-[24px]"
          />
        </div>
      </div>
    </main>
  );
}