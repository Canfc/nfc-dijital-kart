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
      {/* 
        PANELİN ORİJİNAL ORANI: 941 x 1672
        Tüm öğeler bu katmanla beraber ölçeklenir.
      */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",

          width: "max(100vw, calc(100dvh * 941 / 1672))",
          height: "max(100dvh, calc(100vw * 1672 / 941))",

          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          backgroundColor: "#050505",
        }}
      >
        {/* ANA ŞABLON */}
        <img
          src="/yemliha-gerek-panel.png"
          alt="Yemliha Gerek"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* 
          GERÇEK PROFİL FOTOĞRAFI
          Fotoğrafın kendisine hiçbir efekt uygulanmıyor.
          Sadece mevcut dairenin içine kırpılıyor.
        */}
        <div
          style={{
            position: "absolute",

            // Paneldeki altın dairenin iç kısmı
            left: "33%",
            top: "5.55%",
            width: "37%",
            aspectRatio: "1 / 1",

            borderRadius: "50%",
            overflow: "hidden",

            zIndex: 15,
          }}
        >
          <img
            src="/yemliha-gerek-profile.jpg"
            alt="Yemliha Gerek Profil"
            style={{
              display: "block",
              width: "100%",
              height: "100%",

              objectFit: "cover",

              // Sadece kadraj ayarıdır, fotoğrafı değiştirmez
              objectPosition: "center 46%",
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

        {/* İLETİŞİM ve IBAN şimdilik pasif */}
      </div>
    </main>
  );
}