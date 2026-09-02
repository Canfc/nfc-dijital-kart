import type {
  BusinessTemplateProps,
} from "./types";

import {
  trackedHref,
} from "./tracking";

export default function PersonalPremium({
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
          "radial-gradient(circle at top, #202832, #090d12 55%, #040506)",
        padding: "35px 16px 60px",
        color: "#ffffff",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "420px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            padding: "28px 20px",
            borderRadius: "28px",
            background:
              "rgba(18,24,31,.92)",
            border:
              "1px solid #303b46",
            boxShadow:
              "0 30px 80px rgba(0,0,0,.4)",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "26px",
              margin: "0 auto",
              display: "grid",
              placeItems: "center",
              fontSize: "34px",
              fontWeight: "900",
              background:
                "linear-gradient(145deg,#384957,#161f27)",
              border:
                "1px solid #51616f",
            }}
          >
            {business.name
              .charAt(0)
              .toUpperCase()}
          </div>

          <h1
            style={{
              textAlign: "center",
              margin:
                "18px 0 5px",
              fontSize: "27px",
            }}
          >
            {business.name}
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#7f8b96",
              fontSize: "11px",
              marginBottom: "25px",
            }}
          >
            Dijital iletişim kartı
          </p>

          <LinkButton
            href={
              business.instagram_url
                ? trackedHref(
                    business,
                    "instagram",
                    card
                  )
                : null
            }
            text="Instagram"
          />

          <LinkButton
            href={
              business.google_url
                ? trackedHref(
                    business,
                    "google",
                    card
                  )
                : null
            }
            text="Google"
          />

          <LinkButton
            href={
              business.maps_url
                ? trackedHref(
                    business,
                    "konum",
                    card
                  )
                : null
            }
            text="Konum"
          />

          <LinkButton
            href={
              phone
                ? trackedHref(
                    business,
                    "telefon",
                    card
                  )
                : null
            }
            text="Telefon"
          />
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "9px",
            color: "#55606a",
          }}
        >
          {card &&
            `${card.toUpperCase()} · `}
          NFC HUB
        </div>
      </section>
    </main>
  );
}

function LinkButton({
  href,
  text,
}: {
  href?: string | null;
  text: string;
}) {
  if (!href) {
    return null;
  }

  const isPhone =
    href.includes("/telefon");

  return (
    <a
      href={href}
      target={
        isPhone
          ? undefined
          : "_blank"
      }
      rel={
        isPhone
          ? undefined
          : "noopener noreferrer"
      }
      style={{
        display: "block",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "13px",
        background: "#0b1117",
        border:
          "1px solid #2a3640",
        color: "#dbe2e8",
        textDecoration: "none",
        fontSize: "13px",
        fontWeight: "700",
      }}
    >
      {text}

      <span
        style={{
          float: "right",
          color: "#65717c",
        }}
      >
        ›
      </span>
    </a>
  );
}