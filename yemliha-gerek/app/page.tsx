export default function Home() {
  return (
    <main
      style={{
        margin: 0,
        minHeight: "100dvh",
        backgroundColor: "#050505",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "430px",
          aspectRatio: "941 / 1672",
          backgroundColor: "#050505",
          overflow: "hidden",
        }}
      >
        {/* ANA PANEL */}
        <img
          src="/yemliha-gerek-panel.png"
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

        {/* ORİJİNAL PROFİL FOTOĞRAFI */}
        <div
          style={{
            position: "absolute",

            // Altın profil çemberinin iç alanı
            top: "4.7%",
            left: "32.4%",
            width: "35.2%",
            aspectRatio: "1 / 1",

            borderRadius: "50%",
            overflow: "hidden",

            // Paneldeki altın halkayı görünür bırak
            boxShadow: "0 0 0 2px rgba(215, 165, 75, 0.95)",

            zIndex: 10,
          }}
        >
          <img
            src="/yemliha-gerek-profile.jpg"
            alt="Yemliha Gerek"
            style={{
              width: "100%",
              height: "100%",
              display: "block",

              // Fotoğrafın kendisi değişmez,
              // sadece daire içine kırpılır.
              objectFit: "cover",
              objectPosition: "center 48%",
            }}
          />
        </div>

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

        {/* İletişim ve IBAN şimdilik pasif */}
      </div>
    </main>
  );
}