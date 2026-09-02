import type {
  BusinessTemplateProps,
} from "./types";

import {
  trackedHref,
} from "./tracking";

export default function MinimalBusiness({
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
        background: "#f5f5f3",
        color: "#151515",
        padding: "55px 18px",
        fontFamily:
          "Arial, Helvetica, sans-serif",
        boxSizing: "border-box",
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
            fontSize: "11px",
            color: "#777777",
            letterSpacing: ".15em",
          }}
        >
          DIGITAL CARD
        </div>

        <h1
          style={{
            fontSize: "34px",
            margin: "12px 0 30px",
            letterSpacing: "-.04em",
          }}
        >
          {business.name}
        </h1>

        {business.google_url && (
          <MinimalLink
            href={trackedHref(
              business,
              "google",
              card
            )}
            text="Google'da Değerlendir"
          />
        )}

        {business.instagram_url && (
          <MinimalLink
            href={trackedHref(
              business,
              "instagram",
              card
            )}
            text="Instagram"
          />
        )}

        {business.maps_url && (
          <MinimalLink
            href={trackedHref(
              business,
              "konum",
              card
            )}
            text="Konum"
          />
        )}

        {phone && (
          <MinimalLink
            href={trackedHref(
              business,
              "telefon",
              card
            )}
            text="Telefon"
            external={false}
          />
        )}

        <div
          style={{
            marginTop: "38px",
            fontSize: "9px",
            color: "#aaaaaa",
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

function MinimalLink({
  href,
  text,
  external = true,
}: {
  href: string;
  text: string;
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
        justifyContent:
          "space-between",
        alignItems: "center",
        padding: "17px 0",
        color: "#151515",
        textDecoration: "none",
        borderBottom:
          "1px solid #d6d6d2",
        fontSize: "14px",
        fontWeight: "700",
      }}
    >
      <span>{text}</span>

      <span
        style={{
          color: "#777777",
        }}
      >
        ↗
      </span>
    </a>
  );
}