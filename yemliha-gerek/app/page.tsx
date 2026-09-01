export default function Home() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#050505",
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
          backgroundColor: "#050505",
        }}
      >
        {/* ANA ŞABLON */}
        <img
          src="/yemliha-panel.png"
          alt="Yemliha Gerek"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />

        {/* YEMLİHA GEREK */}
        <a
          href="/click?link=yemlihagerek"
          aria-label="Yemliha Gerek Instagram"
          style={{
            position: "absolute",
            left: "9%",
            top: "35.2%",
            width: "82%",
            height: "8.4%",
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
            top: "47.5%",
            width: "82%",
            height: "5.9%",
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
            top: "54%",
            width: "82%",
            height: "5.9%",
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
            top: "60.4%",
            width: "82%",
            height: "5.9%",
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
            top: "66.8%",
            width: "82%",
            height: "5.9%",
            zIndex: 20,
          }}
        />

        {/*
          İLETİŞİM ve IBAN şimdilik pasif.
          Bilgileri verdiğinde bu iki alanı da aktif edeceğiz.
        */}
      </div>
    </main>
  );
}