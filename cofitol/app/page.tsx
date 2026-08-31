export default function Home() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#2b220d",
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
          backgroundColor: "#2b220d",
        }}
      >
        <img
          src="/cofitol-panel.png"
          alt="Coffitol Coffee House"
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
          aria-label="Google Yorum"
          style={{
            position: "absolute",
            left: "5%",
            top: "39.5%",
            width: "22%",
            height: "22%",
            zIndex: 20,
          }}
        />

        {/* INSTAGRAM */}
        <a
          href="/click?link=instagram"
          aria-label="Instagram"
          style={{
            position: "absolute",
            left: "28.5%",
            top: "39.5%",
            width: "22%",
            height: "22%",
            zIndex: 20,
          }}
        />

        {/* KONUM */}
        <a
          href="/click?link=konum"
          aria-label="Konum"
          style={{
            position: "absolute",
            left: "52%",
            top: "39.5%",
            width: "22%",
            height: "22%",
            zIndex: 20,
          }}
        />

        {/* TELEFON */}
        <a
          href="/click?link=telefon"
          aria-label="Telefon"
          style={{
            position: "absolute",
            left: "75.5%",
            top: "39.5%",
            width: "19%",
            height: "22%",
            zIndex: 20,
          }}
        />
      </div>
    </main>
  );
}