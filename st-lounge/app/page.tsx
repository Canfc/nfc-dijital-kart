export default function Home() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#090704",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "430px",
          margin: "0 auto",
          overflow: "hidden",
          backgroundColor: "#090704",
        }}
      >
        <img
          src="/st-lounge-panel.png"
          alt="ST Lounge Cafe"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />

        {/* GOOGLE */}
        <a
          href="/click?link=google"
          aria-label="Google'da Yorum Yap"
          style={{
            position: "absolute",
            left: "14%",
            top: "65.5%",
            width: "72%",
            height: "8.5%",
            zIndex: 20,
          }}
        />

        {/* INSTAGRAM */}
        <a
          href="/click?link=instagram"
          aria-label="Instagram"
          style={{
            position: "absolute",
            left: "14%",
            top: "74%",
            width: "72%",
            height: "8.5%",
            zIndex: 20,
          }}
        />

        {/* KONUM */}
        <a
          href="/click?link=konum"
          aria-label="Konum"
          style={{
            position: "absolute",
            left: "14%",
            top: "82.5%",
            width: "72%",
            height: "8.5%",
            zIndex: 20,
          }}
        />
      </div>
    </main>
  );
}