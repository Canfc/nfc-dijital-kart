export default function Home() {
  return (
    <main className="min-h-screen bg-[#eee6d7] px-5 py-8 text-[#4b2f22]">
      <div className="mx-auto max-w-md">

        <div className="rounded-[32px] bg-[#f7f0e4] px-6 py-7 shadow-lg">
          
          <img
            src="/container-logo.jpg"
            alt="Container Coffee Works"
            className="mx-auto h-28 w-28 rounded-full object-cover shadow-md"
          />

          <div className="mt-5 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              CONTAINER
            </h1>

            <p className="text-sm font-semibold tracking-[0.28em] text-[#8a5a44]">
              COFFEE WORKS
            </p>

            <h2 className="mt-6 text-xl font-bold">
              KİŞİYE ÖZEL KAHVELER VE İÇECEKLER
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76513f]">
              İçeceğinizi “Hayal Edin” biz gerçekleştirelim.
            </p>

            <p className="mt-1 text-sm leading-6 text-[#76513f]">
              Tamamen kişiye özel İçecekler ve Kahveler.
            </p>
          </div>

          <div className="mt-8 space-y-3">

            <a
              href="/click?link=google"
              className="flex items-center gap-4 rounded-2xl bg-[#d1b08d] px-5 py-4 font-bold text-[#3d291f] shadow-sm transition active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6eadb] text-xl font-black text-[#6b4635]">
                G
              </span>
              <span>Google'da Yorum Yap</span>
            </a>

            <a
              href="/click?link=instagram"
              className="flex items-center gap-4 rounded-2xl bg-[#6e4937] px-5 py-4 font-bold text-[#f7eee3] shadow-sm transition active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#f3dec8] text-sm font-bold">
                IG
              </span>
              <span>Instagram</span>
            </a>

            <a
              href="/click?link=konum"
              className="flex items-center gap-4 rounded-2xl bg-[#d1b08d] px-5 py-4 font-bold text-[#3d291f] shadow-sm transition active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6eadb] text-xl">
                📍
              </span>
              <span>Konum</span>
            </a>

            <a
              href="/click?link=telefon"
              className="flex items-center gap-4 rounded-2xl bg-[#6e4937] px-5 py-4 font-bold text-[#f7eee3] shadow-sm transition active:scale-[0.98]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c89f7b] text-xl">
                ☎
              </span>
              <span>Telefon</span>
            </a>

          </div>

          <div className="mt-8 border-t border-[#d6c3ae] pt-5 text-center">
            <p className="text-sm font-semibold italic text-[#76513f]">
              İyi kahve, iyi hissettirir.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}