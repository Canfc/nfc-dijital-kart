export default function Home() {
  return (
    <main className="min-h-screen bg-[#e9ddca] text-[#38271d]">
      <div className="relative mx-auto min-h-screen max-w-[500px] overflow-hidden bg-[#f8efe1] shadow-2xl">

        {/* Dekoratif üst alan */}
        <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full border border-[#b48a5f]/20" />
        <div className="absolute -right-10 top-12 h-28 w-28 rounded-full border border-[#b48a5f]/20" />

        <div className="relative px-5 pb-10 pt-8">

          {/* LOGO */}
          <div className="text-center">
            <img
              src="/logo.jpg"
              alt="Container Coffee Works"
              className="mx-auto w-[230px] object-contain mix-blend-multiply"
            />
          </div>

          {/* SLOGAN */}
          <div className="mt-7 text-center">
            <h1
              className="text-[31px] leading-[1.18] text-[#38271d]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              İçeceğinizi{" "}
              <span className="italic text-[#9e642c]">
                “Hayal Edin”
              </span>
              <br />
              biz gerçekleştirelim
            </h1>

            <div className="mx-auto my-5 flex w-44 items-center gap-3">
              <div className="h-px flex-1 bg-[#bd9163]" />

              <div className="h-2.5 w-2.5 rotate-45 bg-[#a56b32]" />

              <div className="h-px flex-1 bg-[#bd9163]" />
            </div>

            <p className="text-lg">
              Tamamen kişiye özel
            </p>

            <p className="mt-1 text-[23px] font-bold text-[#9e642c]">
              İçecekler ve Kahveler
            </p>
          </div>

          {/* BUTONLAR */}
          <div className="mt-8 space-y-3">

            {/* GOOGLE */}
            <a
              href="/click?link=google"
              className="flex items-center rounded-[23px] bg-[#3b281c] px-4 py-4 text-white shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#efe0ca]">
                <span className="text-[34px] font-black text-[#aa7138]">
                  G
                </span>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">
                  Google&apos;da Yorum Yap
                </p>

                <p className="mt-0.5 text-xs text-[#d9c5b1]">
                  Yorumlarınız bizim için değerli.
                </p>
              </div>

              <span className="text-4xl font-light">›</span>
            </a>

            {/* INSTAGRAM */}
            <a
              href="/click?link=instagram"
              className="flex items-center rounded-[23px] bg-[#ead6b8] px-4 py-4 shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#a66b31]">
                <div className="relative h-7 w-7 rounded-lg border-[3px] border-[#a66b31]">
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#a66b31]" />
                  <div className="absolute right-[2px] top-[2px] h-1.5 w-1.5 rounded-full bg-[#a66b31]" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">
                  Instagram
                </p>

                <p className="mt-0.5 text-xs text-[#725039]">
                  Güncel paylaşımlar ve lezzet dolu anlar.
                </p>
              </div>

              <span className="text-4xl font-light">›</span>
            </a>

            {/* KONUM */}
            <a
              href="/click?link=konum"
              className="flex items-center rounded-[23px] bg-[#3b281c] px-4 py-4 text-white shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#efe0ca] text-2xl text-[#9e642c]">
                ●
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">
                  Konum
                </p>

                <p className="mt-0.5 text-xs text-[#d9c5b1]">
                  Bizi haritada bulmak için tıklayın.
                </p>
              </div>

              <span className="text-4xl font-light">›</span>
            </a>

            {/* TELEFON */}
            <a
              href="/click?link=telefon"
              className="flex items-center rounded-[23px] bg-[#ead6b8] px-4 py-4 shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center text-3xl">
                ☎
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">
                  Bizi Ara
                </p>

                <p className="mt-0.5 text-base">
                  0541 255 45 09
                </p>
              </div>

              <span className="text-4xl font-light">›</span>
            </a>

          </div>
        </div>

        {/* ALT KAHVE BÖLÜMÜ */}
        <div className="relative bg-[#342317] px-6 pb-10 pt-9 text-center">

          <div className="absolute -top-6 left-[-5%] h-12 w-[110%] rounded-[50%] bg-[#f8efe1]" />

          <p
            className="relative mt-5 text-[30px] italic leading-tight text-[#d2a66f]"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            İyi kahve,
            <br />
            iyi hissettirir.
          </p>

          <div className="mx-auto mt-5 h-px w-24 bg-[#a96d35]" />

          <div className="mt-5 flex justify-center gap-3">
            <span className="h-5 w-3 rotate-12 rounded-full bg-[#81502e]" />
            <span className="h-6 w-4 -rotate-12 rounded-full bg-[#a56d3c]" />
            <span className="h-5 w-3 rotate-45 rounded-full bg-[#81502e]" />
          </div>

          <p className="mt-5 text-xs tracking-[0.25em] text-[#a88765]">
            CONTAINER COFFEE WORKS
          </p>
        </div>

      </div>
    </main>
  );
}