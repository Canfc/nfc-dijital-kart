export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4ead9] text-[#352419]">
      <div className="relative mx-auto min-h-screen max-w-[520px] overflow-hidden bg-[#f8efe1] shadow-2xl">

        {/* Üst dekorasyon */}
        <div className="pointer-events-none absolute -left-10 -top-8 opacity-20">
          <svg width="190" height="210" viewBox="0 0 190 210">
            <path
              d="M20 190C70 120 85 55 120 10"
              fill="none"
              stroke="#6f4b33"
              strokeWidth="2"
            />
            <ellipse
              cx="65"
              cy="115"
              rx="34"
              ry="13"
              transform="rotate(-40 65 115)"
              fill="none"
              stroke="#6f4b33"
              strokeWidth="2"
            />
            <ellipse
              cx="92"
              cy="74"
              rx="32"
              ry="12"
              transform="rotate(-35 92 74)"
              fill="none"
              stroke="#6f4b33"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="pointer-events-none absolute right-5 top-5 flex rotate-12 gap-3 opacity-60">
          <span className="h-8 w-5 rotate-12 rounded-[50%] bg-[#5a3826]" />
          <span className="mt-8 h-9 w-6 -rotate-12 rounded-[50%] bg-[#70452d]" />
          <span className="h-7 w-5 rotate-45 rounded-[50%] bg-[#42291d]" />
        </div>

        <div className="relative z-10 px-5 pb-10 pt-10">

          {/* Logo */}
          <div className="text-center">
            <img
              src="/logo.jpg"
              alt="Container Coffee Works"
              className="mx-auto w-[235px] object-contain mix-blend-multiply"
            />
          </div>

          {/* Slogan */}
          <div className="mt-8 text-center">
            <h1
              className="text-[34px] leading-[1.12] text-[#39271d]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              İçeceğinizi{" "}
              <span className="italic text-[#9a6028]">
                “Hayal Edin”
              </span>
              <br />
              biz gerçekleştirelim
            </h1>

            <div className="mx-auto my-5 flex w-40 items-center gap-3">
              <div className="h-px flex-1 bg-[#c69b68]" />
              <div className="h-2.5 w-2.5 rotate-45 rounded-sm bg-[#a36b30]" />
              <div className="h-px flex-1 bg-[#c69b68]" />
            </div>

            <p className="text-lg">
              Tamamen kişiye özel
            </p>

            <p className="text-[23px] font-bold text-[#9a6028]">
              İçecekler ve Kahveler
            </p>
          </div>

          {/* Butonlar */}
          <div className="mt-8 space-y-3">

            {/* Google */}
            <a
              href="/click?link=google"
              className="flex items-center rounded-[22px] bg-[#3b291c] px-4 py-4 text-[#fff7ec] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f2e3cf]">
                <span
                  className="text-4xl font-bold text-[#a36b30]"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  G
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">
                  Google&apos;da Yorum Yap
                </p>
                <p className="mt-0.5 text-xs text-[#eadaca]">
                  Sizi önemsiyoruz, yorumlarınız bizim için değerli.
                </p>
              </div>

              <span className="ml-3 text-4xl font-light">›</span>
            </a>

            {/* Instagram */}
            <a
              href="/click?link=instagram"
              className="flex items-center rounded-[22px] bg-[#ead7bd] px-4 py-4 text-[#39271d] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#a36b30]">
                <div className="relative h-7 w-7 rounded-[8px] border-[3px] border-[#a36b30]">
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#a36b30]" />
                  <div className="absolute right-[2px] top-[2px] h-1.5 w-1.5 rounded-full bg-[#a36b30]" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">
                  Instagram
                </p>
                <p className="mt-0.5 text-xs text-[#6b4a35]">
                  Güncel paylaşımlar ve lezzet dolu anlar.
                </p>
              </div>

              <span className="ml-3 text-4xl font-light">›</span>
            </a>

            {/* Konum */}
            <a
              href="/click?link=konum"
              className="flex items-center rounded-[22px] bg-[#3b291c] px-4 py-4 text-[#fff7ec] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                <svg
                  width="36"
                  height="44"
                  viewBox="0 0 36 44"
                  fill="none"
                >
                  <path
                    d="M18 42C18 42 33 27 33 16.5C33 8.5 26.3 2 18 2C9.7 2 3 8.5 3 16.5C3 27 18 42 18 42Z"
                    fill="#ead7bd"
                  />
                  <circle cx="18" cy="16" r="5" fill="#3b291c" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">Konum</p>
                <p className="mt-0.5 text-xs text-[#eadaca]">
                  Bizi haritada bulmak için tıklayın.
                </p>
              </div>

              <span className="ml-3 text-4xl font-light">›</span>
            </a>

            {/* Telefon */}
            <a
              href="/click?link=telefon"
              className="flex items-center rounded-[22px] bg-[#ead7bd] px-4 py-4 text-[#39271d] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b291c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2H7.2a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.06 9.77a16 16 0 0 0 6 6l1.31-1.31a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">Bizi Ara</p>
                <p className="mt-0.5 text-base">
                  0541 255 45 09
                </p>
              </div>

              <span className="ml-3 text-4xl font-light">›</span>
            </a>
          </div>
        </div>

        {/* Alt kahve bölümü */}
        <div className="relative mt-3 overflow-hidden bg-[#362519] px-6 pb-10 pt-9 text-center text-[#d5ad77]">
          <div className="absolute -top-6 left-[-5%] h-12 w-[110%] rounded-[50%] bg-[#f8efe1]" />

          <p
            className="relative z-10 mt-5 text-3xl italic"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            İyi kahve,
            <br />
            iyi hissettirir.
          </p>

          <div className="mx-auto mt-4 h-px w-24 bg-[#b47a3b]" />

          <div className="mt-5 flex justify-center gap-3 opacity-70">
            <span className="h-5 w-3 rotate-12 rounded-[50%] bg-[#a56b39]" />
            <span className="h-6 w-4 -rotate-12 rounded-[50%] bg-[#c18a4c]" />
            <span className="h-5 w-3 rotate-45 rounded-[50%] bg-[#986035]" />
          </div>
        </div>
      </div>
    </main>
  );