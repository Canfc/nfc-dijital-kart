import type {
  BusinessTemplateProps,
} from "./types";

import {
  trackedHref,
} from "./tracking";

export default function RestaurantDark({
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
          "linear-gradient(180deg, #090909 0%, #111111 45%, #050505 100%)",
        color: "#f5f5f5",
        padding: "40px 16px 60px",
        fontFamily:
          "Georgia, 'Times New Roman', serif",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "440px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            border: "1px solid #393939",
            padding: "30px 22px",
            background: "#0d0d0d",
          }}
        >
          {/* BAŞLIK */}

          <div
            style={{
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                letterSpacing: ".28em",
                color: "#9c9c9c",
              }}
            >
              RESTAURANT
            </div>

            <h1
              style={{
                fontSize: "30px",
                margin: "10px 0",
                fontWeight: "500",
              }}
            >
              {business.name}
            </h1>

            <div
              style={{
                width: "55px",
                height: "1px",
                background: "#747474",
                margin: "15px auto",
              }}
            />

            <p
              style={{
                color: "#858585",
                fontSize: "12px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Size daha iyi hizmet
              verebilmemiz için
              deneyiminizi paylaşın.
            </p>
          </div>

          {/* GOOGLE */}

          {business.google_url && (
            <RestaurantLink
              href={trackedHref(
                business,
                "google",
                card
              )}
              title="Google Yorum"
              description="Bizi değerlendirin"
              icon="★"
            />
          )}

          {/* INSTAGRAM */}

          {business.instagram_url && (
            <RestaurantLink
              href={trackedHref(
                business,
                "instagram",
                card
              )}
              title="Instagram"
              description="Sosyal medyada takip edin"
              icon="◎"
            />
          )}

          {/* KONUM */}

          {business.maps_url && (
            <RestaurantLink
              href={trackedHref(
                business,
                "konum",
                card
              )}
              title="Konum"
              description="Haritalarda görüntüle"
              icon="⌖"
            />
          )}

          {/* TELEFON */}

          {phone && (
            <RestaurantLink
              href={trackedHref(
                business,
                "telefon",
                card
              )}
              title="Telefon"
              description={business.phone}
              icon="☎"
              external={false}
            />
          )}
        </div>

        {/* FOOTER */}

        <div
          style={{
            textAlign: "center",
            marginTop: "22px",
            fontFamily:
              "Arial, Helvetica, sans-serif",
            fontSize: "9px",
            color: "#555555",
            letterSpacing: ".06em",
          }}
        >
          {card && (
            <>
              KART{" "}
              {card.toUpperCase()}
              {" · "}
            </>
          )}

          NFC HUB
        </div>
      </section>
    </main>
  );
}

function RestaurantLink({
  href,
  title,
  description,
  icon,
  external = true,
}: {
  href: string;
  title: string;
  description?: string | null;
  icon: string;
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
        padding: "15px 4px",
        borderBottom:
          "1px solid #292929",
        color: "#f2f2f2",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: "28px",
          flexShrink: 0,
          color: "#a6a6a6",
          textAlign: "center",
          fontSize: "17px",
        }}
      >
        {icon}
      </span>

      <div
        style={{
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: "14px",
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              color: "#696969",
              fontSize: "10px",
              marginTop: "3px",
            }}
          >
            {description}
          </div>
        )}
      </div>

      <span
        style={{
          marginLeft: "auto",
          color: "#686868",
          fontSize: "15px",
        }}
      >
        →
      </span>
    </a>
  );
}