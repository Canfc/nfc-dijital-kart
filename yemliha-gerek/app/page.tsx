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
        {/* ANA PANEL */}
        <img
          src="/yemliha-gerek-panel-v2.png"
          alt="Yemliha Gerek"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
          }}
        />

        {/* YEMLİHA GEREK */}
        <a
          href="/click?link=yemlihagerek"
          aria-label="Yemliha Gerek Instagram"
          style={{
            position: "absolute",
            left: "12%",
            top: "41.3%",
            width: "76%",
            height: "8.6%",
            zIndex: 20,
          }}
        />

        {/* ÇADIR KEYFİ */}
        <a
          href="/click?link=cadirkeyfi"
          aria-label="Çadır Keyfi"
          style={{
            position: "absolute",
            left: "12%",
            top: "53.3%",
            width: "76%",
            height: "5.7%",
            zIndex: 20,
          }}
        />

        {/* MARMARA FEST */}
        <a
          href="/click?link=marmarafest"
          aria-label="Marmara Fest"
          style={{
            position: "absolute",
            left: "12%",
            top: "59.4%",
            width: "76%",
            height: "5.7%",
            zIndex: 20,
          }}
        />

        {/* KOCAELİ PLANI */}
        <a
          href="/click?link=kocaeliplani"
          aria-label="Kocaeli Planı"
          style={{
            position: "absolute",
            left: "12%",
            top: "65.5%",
            width: "76%",
            height: "5.7%",
            zIndex: 20,
          }}
        />

        {/* ÇADIR KEYFİ VOLEYBOL */}
        <a
          href="/click?link=cadirkeyfivoleybol"
          aria-label="Çadır Keyfi Voleybol"
          style={{
            position: "absolute",
            left: "12%",
            top: "71.6%",
            width: "76%",
            height: "5.7%",
            zIndex: 20,
          }}
        />

        {/*
          İLETİŞİM:
          Şimdilik pasif.
          Telefon numarası geldiğinde aktif edeceğiz.

          IBAN:
          Şimdilik pasif.
          IBAN geldiğinde ayrı kopyalama ekranına bağlayacağız.
        */}
      </div>
    </main>
  );
}