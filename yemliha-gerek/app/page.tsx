export default function Home() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "100%",
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
          lineHeight: 0,
          background: "#000",
        }}
      >
        {/* PANEL */}
        <img
          src="/yemliha-premium-panel.png"
          alt="Yemliha Gerek"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />

        {/* INSTAGRAM */}
        <a
          href="/click?link=yemlihagerek"
          aria-label="Yemliha Gerek Instagram"
          style={{
            position: "absolute",
            left: "9.5%",
            top: "36.7%",
            width: "81%",
            height: "9%",
            zIndex: 10,
          }}
        />

        {/* ÇADIR KEYFİ */}
        <a
          href="/click?link=cadirkeyfi"
          aria-label="Çadır Keyfi"
          style={{
            position: "absolute",
            left: "9.5%",
            top: "49.7%",
            width: "81%",
            height: "7.7%",
            zIndex: 10,
          }}
        />

        {/* MARMARA FEST */}
        <a
          href="/click?link=marmarafest"
          aria-label="Marmara Fest"
          style={{
            position: "absolute",
            left: "9.5%",
            top: "58.4%",
            width: "81%",
            height: "7.7%",
            zIndex: 10,
          }}
        />

        {/* KOCAELİ PLANI */}
        <a
          href="/click?link=kocaeliplani"
          aria-label="Kocaeli Planı"
          style={{
            position: "absolute",
            left: "9.5%",
            top: "67%",
            width: "81%",
            height: "7.7%",
            zIndex: 10,
          }}
        />

        {/* ÇADIR KEYFİ VOLEYBOL */}
        <a
          href="/click?link=cadirkeyfivoleybol"
          aria-label="Çadır Keyfi Voleybol"
          style={{
            position: "absolute",
            left: "9.5%",
            top: "75.7%",
            width: "81%",
            height: "7.7%",
            zIndex: 10,
          }}
        />

        {/* TELEFON */}
        <a
          href="tel:+905468474849"
          aria-label="Yemliha Gerek telefon"
          style={{
            position: "absolute",
            left: "8.7%",
            top: "84.8%",
            width: "40%",
            height: "7.8%",
            zIndex: 10,
          }}
        />

        {/* IBAN
            Şimdilik özellikle tıklanabilir değil.
            Gerçek IBAN geldiğinde /iban sayfasına bağlayacağız.
        */}
      </div>
    </main>
  );
}