import Image from "next/image";

function CoffeeBean({ className = "" }) {
  return (
    <div
      className={`relative h-8 w-5 rotate-[28deg] rounded-[50%] bg-[#5b3522] shadow-md ${className}`}
    >
      <div className="absolute left-1/2 top-[3px] h-[26px] w-px -translate-x-1/2 rotate-[8deg] bg-[#b98758]/70" />
    </div>
  );
}

function CoffeeCup({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 150 120"
      className={`h-[105px] w-[135px] opacity-95 ${
        flip ? "-scale-x-100" : ""
      }`}
    >
      <ellipse cx="65" cy="103" rx="52" ry="8" fill="#1e140e" opacity="0.3" />

      <path
        d="M28 34h78l-8 58c-1 8-8 14-16 14H51c-8 0-15-6-16-14L28 34Z"
        fill="#b98550"
      />

      <path d="M25 28h84v12H25Z" rx="5" fill="#2c1c13" />

      <path
        d="M105 47h11c17 0 22 26 4 35h-17"
        fill="none"
        stroke="#b98550"
        strokeWidth="9"
        strokeLinecap="round"
      />

      <path
        d="M52 59c9-10 19-10 28 0M57 70c6-6 13-6 19 0"
        fill="none"
        stroke="#f2dfc4"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <text
        x="66"
        y="91"
        textAnchor="middle"
        fill="#392419"
        fontSize="9"
        fontWeight="700"
      >
        CONTAINER
      </text>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#eadfcd] text-[#38271d]">
      <div className="relative mx-auto min-h-screen max-w-[520px] overflow-hidden bg-[#f8efe1] shadow-2xl">

        {/* SOL ÜST YAPRAK */}
        <svg
          className="pointer-events-none absolute -left-10 -top-7 h-[220px] w-[190px] opacity-[0.18]"
          viewBox="0 0 190 220"
          fill="none"
        >
          <path
            d="M23 210C44 142 77 75 138 12"
            stroke="#755039"
            strokeWidth="2"
          />
          <path
            d="M52 154C18 136 12 105 20 78C52 86 71 112 52 154Z"
            stroke="#755039"
            strokeWidth="2"
          />
          <path
            d="M77 113C51 88 55 59 70 37C97 53 107 82 77 113Z"
            stroke="#755039"
            strokeWidth="2"
          />
          <path
            d="M97 76C82 47 94 24 114 9C134 34 128 59 97 76Z"
            stroke="#755039"
            strokeWidth="2"
          />
        </svg>

        {/* SAĞ ÜST ÇEKİRDEKLER */}
        <div className="pointer-events-none absolute right-4 top-5 opacity-80">
          <CoffeeBean className="absolute right-14 top-0 rotate-[45deg]" />
          <CoffeeBean className="absolute right-2 top-8 rotate-[-20deg]" />
          <CoffeeBean className="absolute right-16 top-16 rotate-[10deg]" />
          <CoffeeBean className="absolute right-1 top-[92px] rotate-[35deg]" />
        </div>

        <div className="relative z-10 px-5 pb-8 pt-8">

          {/* LOGO */}
          <div className="text-center">
            <Image
              src="/container-logo.jpg"
              alt="Container Coffee Works"
              width={500}
              height={500}
              priority
              className="mx-auto h-auto w-[225px] mix-blend-multiply"
            />
          </div>

          {/* SLOGAN */}
          <div className="mt-3 text-center">
            <h1
              className="text-[31px] leading-[1.17] text-[#39271d]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              İçeceğinizi{" "}
              <span className="italic text-[#a36a31]">
                “Hayal Edin”
              </span>
              <br />
              biz gerçekleştirelim
            </h1>

            <div className="mx-auto my-5 flex w-44 items-center gap-3">
              <div className="h-px flex-1 bg-[#c89a66]" />
              <div className="h-2.5 w-2.5 rotate-45 rounded-sm bg-[#a36a31]" />
              <div className="h-px flex-1 bg-[#c89a66]" />
            </div>

            <p className="text-lg text-[#4c382b]">
              Tamamen kişiye özel
            </p>

            <p className="mt-1 text-[23px] font-bold text-[#9d6229]">
              İçecekler ve Kahveler
            </p>
          </div>

          {/* BUTONLAR */}
          <div className="mt-8 space-y-3">

            {/* GOOGLE */}
            <a
              href="/click?link=google"
              className="flex items-center rounded-[22px] bg-[#3a281c] px-4 py-4 text-[#fff8ee] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f2e2ca]">
                <span className="text-[34px] font-black text-[#a97037]">
                  G
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">
                  Google&apos;da Yorum Yap
                </p>
                <p className="mt-0.5 text-xs text-[#dbc7b3]">
                  Sizi önemsiyoruz, yorumlarınız bizim için değerli.
                </p>
              </div>

              <span className="ml-2 text-4xl font-light">›</span>
            </a>

            {/* INSTAGRAM */}
            <a
              href="/click?link=instagram"
              className="flex items-center rounded-[22px] bg-[#ead7bc] px-4 py-4 text-[#39271d] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                <div className="relative h-12 w-12 rounded-[14px] border-[3px] border-[#a56b34]">
                  <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#a56b34]" />
                  <div className="absolute right-[6px] top-[6px] h-2.5 w-2.5 rounded-full bg-[#a56b34]" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">Instagram</p>
                <p className="mt-0.5 text-xs text-[#72503a]">
                  Güncel paylaşımlar ve lezzet dolu anlar.
                </p>
              </div>

              <span className="ml-2 text-4xl font-light">›</span>
            </a>

            {/* KONUM */}
            <a
              href="/click?link=konum"
              className="flex items-center rounded-[22px] bg-[#3a281c] px-4 py-4 text-[#fff8ee] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                <svg width="38" height="46" viewBox="0 0 38 46">
                  <path
                    d="M19 44S35 28 35 17C35 8 28 2 19 2S3 8 3 17c0 11 16 27 16 27Z"
                    fill="#ead7bc"
                  />
                  <circle cx="19" cy="17" r="5" fill="#3a281c" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">Konum</p>
                <p className="mt-0.5 text-xs text-[#dbc7b3]">
                  Bizi haritada bulmak için tıklayın.
                </p>
              </div>

              <span className="ml-2 text-4xl font-light">›</span>
            </a>

            {/* TELEFON */}
            <a
              href="/click?link=telefon"
              className="flex items-center rounded-[22px] bg-[#ead7bc] px-4 py-4 text-[#39271d] shadow-lg transition active:scale-[0.98]"
            >
              <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center">
                <svg
                  width="39"
                  height="39"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3a281c"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.3 19.3 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.9 12.9 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.9 12.9 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold">Bizi Ara</p>
                <p className="mt-0.5 text-base">
                  0541 255 45 09
                </p>
              </div>

              <span className="ml-2 text-4xl font-light">›</span>
            </a>
          </div>
        </div>

        {/* ALT KAHVE ALANI */}
        <div className="relative mt-3 min-h-[215px] overflow-hidden bg-[#342317] px-4 pb-5 pt-12 text-center">

          {/* Kavis */}
          <div className="absolute -top-[42px] left-[-10%] h-[75px] w-[120%] rounded-[50%] bg-[#f8efe1]" />

          {/* SOL BARDAK */}
          <div className="absolute -bottom-2 -left-4">
            <CoffeeCup />
          </div>

          {/* SAĞ BARDAK */}
          <div className="absolute -bottom-3 -right-5">
            <CoffeeCup flip />
          </div>

          {/* ÇEKİRDEKLER */}
          <CoffeeBean className="absolute bottom-10 left-[125px] scale-75 rotate-[45deg]" />
          <CoffeeBean className="absolute bottom-4 right-[125px] scale-75 rotate-[-20deg]" />

          <div className="relative z-10">
            <p
              className="text-[30px] italic leading-tight text-[#d4aa75]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              İyi kahve,
              <br />
              iyi hissettirir.
            </p>

            <div className="mx-auto mt-5 h-px w-24 bg-[#aa7037]" />

            <p className="mt-5 text-[10px] tracking-[0.25em] text-[#9d7b5e]">
              CONTAINER COFFEE WORKS
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}