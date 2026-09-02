import type {
  BusinessTemplateProps,
} from "./types";

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
            color: "#777",
            letterSpacing: ".15em",
          }}
        >
          DIGITAL CARD
        </div>

        <h1
          style={{
            fontSize: "34px",
            margin:
              "12px 0 30px",
            letterSpacing:
              "-.04em",
          }}
        >
          {business.name}
        </h1>

        <MinimalLink
          href={
            business.google_url
          }
          text="Google'da Değerlendir"
        />

        <MinimalLink
          href={
            business.instagram_url
          }
          text="Instagram"
        />

        <MinimalLink
          href={
            business.maps_url
          }
          text="Konum"
        />

        <MinimalLink
          href={
            phone
              ? `tel:${phone}`
              : null
          }
          text="Telefon"
        />

        <div
          style={{
            marginTop: "38px",
            fontSize: "9px",
            color: "#aaa",
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
}: {
  href?: string | null;
  text: string;
}) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target={
        href.startsWith("tel:")
          ? undefined
          : "_blank"
      }
      rel="noopener noreferrer"
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        padding:
          "17px 0",
        color: "#151515",
        textDecoration: "none",
        borderBottom:
          "1px solid #d6d6d2",
        fontSize: "14px",
        fontWeight: "700",
      }}
    >
      {text}

      <span>↗</span>
    </a>
  );
}