export default function Home() {
  return (
    <main className="min-h-screen bg-[#efe4d2] text-[#38271d]">
      <div className="mx-auto min-h-screen max-w-[520px] overflow-hidden bg-[#f8efe1] shadow-2xl">

        {/* Üst bölüm */}
        <section className="px-5 pb-8 pt-9">

          {/* Logo */}
          <div className="text-center">
            <img
              src="/logo.jpg"
              alt="Container Coffee Works"
              className="mx-auto w-[230px] object-contain mix-blend-multiply"
            />
          </div>

          {/* Slogan */}
          <div className="mt-7 text-center">
            <h1
              className="text-[32px] leading-[1.15]"
              style={{
                fontFamily: "Georgia, Times New Roman, serif",
              }}
            >
              İçeceğinizi{" "}
              <span className="italic text-[#9b642e]">
                “Hayal Edin”
              </span>
              <br />
              biz gerçekleştirelim
            </h1>

            <div className="mx-auto my-5 flex w-40 items-center gap-3">
              <div className="h-px flex-1 bg-[#c99c67]" />
              <div className="h-2.5 w-2.5 rotate-45 bg-[#a56e35]" />
              <div className="h-px flex-1 bg-[#c99c67]" />
            </div>

            <p className="text-lg">
              Tamamen kişiye özel
            </p>

            <p className="mt-1 text-[23px] font-bold text-[#9b642e]">
              İçecekler ve Kahveler
            </p>
          </div>

          {/* Butonlar */}
          <div className="mt-8 space-y-3">

            {/* Google */}
            <a
              href="/click?link=google"
              className="flex items-center rounded-[22px] bg-[#3c2a1d] px-4 py-4 text-[#fff7ec] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0dfc8]">
                <span className="text-4xl font-bold text-[#a66c31]">
                  G
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">
                  Google&apos;da Yorum Yap
                </p>
                <p className="mt-1 text-xs text-[#ead9c7]">
                  Sizi önemsiyoruz, yorumlarınız bizim için değerli.
                </p>
              </div>

              <span className="ml-3 text-4xl">›</span>
            </a>

            {/* Instagram */}
            <a
              href="/click?link=instagram"
              className="flex items-center rounded-[22px] bg-[#ead8be] px-4 py-4 text-[#38271d] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#a66c31]">
                <span className="text-sm font-bold text-[#a66c31]">
                  IG
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">
                  Instagram
                </p>
                <p className="mt-1 text-xs text-[#6c4a34]">
                  Güncel paylaşımlar ve lezzet dolu anlar.
                </p>
              </div>

              <span className="ml-3 text-4xl">›</span>
            </a>

            {/* Konum */}
            <a
              href="/click?link=konum"
              className="flex items-center rounded-[22px] bg-[#3c2a1d] px-4 py-4 text-[#fff7ec] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center text-3xl text-[#ead8be]">
                ●
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">
                  Konum
                </p>
                <p className="mt-1 text-xs text-[#ead9c7]">
                  Bizi haritada bulmak için tıklayın.
                </p>
              </div>

              <span className="ml-3 text-4xl">›</span>
            </a>

            {/* Telefon */}
            <a
              href="/click?link=telefon"
              className="flex items-center rounded-[22px] bg-[#ead8be] px-4 py-4 text-[#38271d] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center text-3xl">
                ☎
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">
                  Bizi Ara
                </p>
                <p className="mt-1 text-base">
                  0541 255 45 09
                </p>
              </div>

              <span className="ml-3 text-4xl">›</span>
            </a>

          </div>
        </section>

        {/* Alt bölüm */}
        <section className="bg-[#362519] px-6 py-10 text-center text-[#d7ae78]">
          <p
            className="text-3xl italic"
            style={{
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            İyi kahve,
            <br />
            iyi hissettirir.
          </p>

          <div className="mx-auto mt-5 h-px w-24 bg-[#b67d42]" />

          <div className="mt-5 text-xl">
            ◇ ◇ ◇
          </div>
        </section>

      </div>
    </main>
  );
}