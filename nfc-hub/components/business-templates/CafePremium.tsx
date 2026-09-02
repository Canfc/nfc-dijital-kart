import type {
  BusinessTemplateProps,
} from "./types";

export default function CafePremium({
  business,
  card,
}: BusinessTemplateProps) {
  const phone =
    business.phone?.replace(
      /[^0-9+]/g,
      ""
    ) || "";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% -10%, #302719 0%, #15110c 38%, #070605 100%)",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        padding: "42px 16px 60px",
        boxSizing: "border-box",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "430px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "82px",
              height: "82px",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(145deg, #72501f, #2b1d0d)",
              border:
                "1px solid #b58a43",
              color: "#f1cc82",
              fontSize: "31px",
              fontWeight: "900",
              boxShadow:
                "0 18px 50px rgba(0,0,0,.4)",
            }}
          >
            {business.name
              .charAt(0)
              .toUpperCase()}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "27px",
          }}
        >
          <div
            style={{
              color: "#d8aa55",
              fontSize: "10px",
              letterSpacing: ".18em",
              fontWeight: "900",
            }}
          >
            CAFE PREMIUM
          </div>

          <h1
            style={{
              margin: "8px 0 0",
              fontSize: "29px",
            }}
          >
            {business.name}
          </h1>

          <p
            style={{
              color: "#9c9285",
              fontSize: "12px",
              margin: "9px 0 0",
            }}
          >
            Deneyiminizi paylaşın
            veya bize ulaşın.
          </p>
        </div>

        {business.google_url && (
          <PremiumButton
            href={business.google_url}
            title="Google'da Değerlendir"
            description="Görüşünüz bizim için değerli"
            icon="★"
            primary
          />
        )}

        {business.instagram_url && (
          <PremiumButton
            href={business.instagram_url}
            title="Instagram"
            description="Bizi takip edin"
            icon="◎"
          />
        )}

        {business.maps_url && (
          <PremiumButton
            href={business.maps_url}
            title="Konum"
            description="Yol tarifi alın"
            icon="⌖"
          />
        )}

        {phone && (
          <PremiumButton
            href={`tel:${phone}`}
            title="Telefon"
            description={business.phone}
            icon="☎"
            external={false}
          />
        )}

        <Footer card={card} />
      </section>
    </main>
  );
}

function PremiumButton({
  href,
  title,
  description,
  icon,
  primary = false,
  external = true,
}: {
  href: string;
  title: string;
  description?: string | null;
  icon: string;
  primary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={
        external
          ? "_blank"
          : undefined
      }
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px",
        marginBottom: "11px",
        borderRadius: "17px",
        textDecoration: "none",

        background: primary
          ? "linear-gradient(135deg, #c59237, #f0cf79)"
          : "linear-gradient(145deg, #17130f, #0f0d0a)",

        border: primary
          ? "1px solid #e9c16c"
          : "1px solid #3b3023",

        color: primary
          ? "#1d160b"
          : "#ffffff",

        boxShadow: primary
          ? "0 16px 35px rgba(198,145,50,.14)"
          : "none",
      }}
    >
      <div
        style={{
          width: "43px",
          height: "43px",
          borderRadius: "13px",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          background: primary
            ? "rgba(30,20,5,.12)"
            : "#211a12",
          fontSize: "20px",
          fontWeight: "900",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontWeight: "900",
            fontSize: "14px",
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              marginTop: "4px",
              fontSize: "10px",
              opacity: 0.6,
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          marginLeft: "auto",
          fontSize: "19px",
          opacity: 0.5,
        }}
      >
        ›
      </div>
    </a>
  );
}

function Footer({
  card,
}: {
  card?: string;
}) {
  return (
    <>
      {card && (
        <div
          style={{
            marginTop: "21px",
            textAlign: "center",
            color: "#61594e",
            fontSize: "9px",
          }}
        >
          KART:{" "}
          {card.toUpperCase()}
        </div>
      )}

      <div
        style={{
          marginTop: "22px",
          textAlign: "center",
          color: "#514b43",
          fontSize: "9px",
          letterSpacing: ".08em",
        }}
      >
        POWERED BY NFC HUB
      </div>
    </>
  );
}