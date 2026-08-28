import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e9dcc8]">
      <div className="mx-auto w-full max-w-[520px]">

        <div className="relative w-full">

          {/* TASARIM GÖRSELİ */}
          <Image
            src="/container-panel.png"
            alt="Container Coffee Works"
            width={1024}
            height={1536}
            priority
            className="h-auto w-full"
          />

          {/* GOOGLE */}
          <a
            href="/click?link=google"
            aria-label="Google'da Yorum Yap"
            className="absolute left-[17.8%] top-[42.5%] h-[8.3%] w-[64.5%] rounded-[24px]"
          />

          {/* INSTAGRAM */}
          <a
            href="/click?link=instagram"
            aria-label="Instagram"
            className="absolute left-[17.8%] top-[51.4%] h-[8.2%] w-[64.5%] rounded-[24px]"
          />

          {/* KONUM */}
          <a
            href="/click?link=konum"
            aria-label="Konum"
            className="absolute left-[17.8%] top-[60.6%] h-[8.1%] w-[64.5%] rounded-[24px]"
          />

          {/* TELEFON */}
          <a
            href="/click?link=telefon"
            aria-label="Bizi Ara"
            className="absolute left-[17.8%] top-[69.6%] h-[8.1%] w-[64.5%] rounded-[24px]"
          />

        </div>

      </div>
    </main>
  );
}