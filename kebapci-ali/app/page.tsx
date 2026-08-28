export default function Home() {
  return (
    <main className="min-h-screen bg-black px-5 py-8">
      <div className="mx-auto max-w-md">

        <img
          src="/logo.png"
          alt="Kebapçı Ali"
          className="mx-auto h-28 w-28 object-contain"
        />

        <div className="mt-5 text-center">
          <h1 className="text-3xl font-bold text-white">
            Kebapçı Ali
          </h1>

          <p className="mt-2 text-sm text-gray-300">
            Kebap Ve Dürüm Çeşitleri
          </p>

          <p className="mt-3 text-sm text-gray-400">
            Lezzetin adresi
          </p>
        </div>

        <div className="mt-8 space-y-3">

          <a
            href="/click?link=google"
            className="block rounded-2xl bg-white px-5 py-4 text-center font-bold text-black shadow-lg"
          >
            ⭐ Google&apos;da Yorum Yap
          </a>

          <a
            href="/click?link=instagram"
            className="block rounded-2xl bg-[#1f1f1f] px-5 py-4 text-center font-semibold text-white shadow"
          >
            📸 Instagram
          </a>

          <a
            href="/click?link=konum"
            className="block rounded-2xl bg-[#1f1f1f] px-5 py-4 text-center font-semibold text-white shadow"
          >
            📍 Konum
          </a>

          <a
            href="/click?link=telefon"
            className="block rounded-2xl bg-[#1f1f1f] px-5 py-4 text-center font-semibold text-white shadow"
          >
            📞 Bizi Ara
          </a>

        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          AFİYET OLSUN
        </p>

      </div>
    </main>
  );
}