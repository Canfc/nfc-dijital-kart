export default function Home() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "430px",
          height: "100dvh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* PREMIUM PANEL */}
        <img
          src="/yemliha-premium-panel.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
          }}
        />

        {/* ORİJİNAL PROFİL FOTOĞRAFI */}
        <div
          style={{
            position: "absolute",
            left: "36.6%",
            top: "5.0%",
            width: "26.3%",
            height: "17.2%",
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 5,
            boxShadow:
              "0 0 0 2px #17100a, 0 0 0 4px #b77b1f, 0 0 22px rgba(218,160,55,.6)",
          }}
        >
          <img
            src="/yemliha-gerek-profile.jpg"
            alt="Yemliha Gerek"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {/* INSTAGRAM */}
        <a
          href="/click?link=yemlihagerek"
          aria-label="Yemliha Gerek Instagram"
          style={{
            position: "absolute",
            left: "9%",
            top: "36.8%",
            width: "82%",
            height: "9%",
            zIndex: 20,
          }}
        />

        {/* ÇADIR KEYFİ */}
        <a
          href="/click?link=cadirkeyfi"
          aria-label="Çadır Keyfi"
          style={{
            position: "absolute",
            left: "9%",
            top: "49.7%",
            width: "82%",
            height: "7.7%",
            zIndex: 20,
          }}
        />

        {/* MARMARA FEST */}
        <a
          href="/click?link=marmarafest"
          aria-label="Marmara Fest"
          style={{
            position: "absolute",
            left: "9%",
            top: "58.4%",
            width: "82%",
            height: "7.7%",
            zIndex: 20,
          }}
        />

        {/* KOCAELİ PLANI */}
        <a
          href="/click?link=kocaeliplani"
          aria-label="Kocaeli Planı"
          style={{
            position: "absolute",
            left: "9%",
            top: "67%",
            width: "82%",
            height: "7.7%",
            zIndex: 20,
          }}
        />

        {/* ÇADIR KEYFİ VOLEYBOL */}
        <a
          href="/click?link=cadirkeyfivoleybol"
          aria-label="Çadır Keyfi Voleybol"
          style={{
            position: "absolute",
            left: "9%",
            top: "75.7%",
            width: "82%",
            height: "7.7%",
            zIndex: 20,
          }}
        />

        {/* TELEFON */}
        <a
          href="tel:+905468474849"
          aria-label="Yemliha Gerek telefon"
          style={{
            position: "absolute",
            left: "8.5%",
            top: "84.8%",
            width: "40.5%",
            height: "8%",
            zIndex: 20,
          }}
        />

        {/* IBAN - ŞİMDİLİK PASİF */}
      </div>
    </main>
  );
}