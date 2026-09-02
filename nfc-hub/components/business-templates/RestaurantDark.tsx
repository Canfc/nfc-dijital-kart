import type {
  BusinessTemplateProps,
} from "./types";

export default function RestaurantDark({
  business,
  card,
}: BusinessTemplateProps) {
  const phone =
    business.phone?.replace(
      /[^0-9+]/g,
      ""
    ) || "";

  const actions = [
    {
      title: "Google Yorum",
      description:
        "Bizi değerlendirin",
      href: business.google_url,
      icon: "★",
    },
    {
      title: "Instagram",
      description:
        "Sosyal medyada takip edin",
      href: business.instagram_url,
      icon: "◎",
    },
    {
      title: "Konum",
      description:
        "Haritalarda görüntüle",
      href: business.maps_url,
      icon: "⌖",
    },
    {
      title: "Telefon",
      description:
        business.phone,
      href: phone
        ? `tel:${phone}`
        : null,
      icon: "☎",
    },
  ].filter(
    (item) => item.href
  );

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
            border:
              "1px solid #393939",
            padding: "30px 22px",
            background: "#0d0d0d",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                letterSpacing:
                  ".28em",
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
                background:
                  "#747474",
                margin: "15px auto",
              }}
            />

            <p
              style={{
                color: "#858585",
                fontSize: "12px",
                lineHeight: 1.6,
              }}
            >
              Size daha iyi hizmet
              verebilmemiz için
              deneyiminizi paylaşın.
            </p>
          </div>

          {actions.map(
            (item) => (
              <a
                key={item.title}
                href={
                  item.href!
                }
                target={
                  item.href?.startsWith(
                    "tel:"
                  )
                    ? undefined
                    : "_blank"
                }
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "14px",
                  padding:
                    "15px 4px",
                  borderBottom:
                    "1px solid #292929",
                  color: "#f2f2f2",
                  textDecoration:
                    "none",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    color: "#a6a6a6",
                  }}
                >
                  {item.icon}
                </span>

                <div>
                  <div
                    style={{
                      fontSize:
                        "14px",
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      color:
                        "#696969",
                      fontSize:
                        "10px",
                      marginTop:
                        "3px",
                    }}
                  >
                    {
                      item.description
                    }
                  </div>
                </div>

                <span
                  style={{
                    marginLeft:
                      "auto",
                    color:
                      "#686868",
                  }}
                >
                  →
                </span>
              </a>
            )
          )}
        </div>

        <Bottom card={card} />
      </section>
    </main>
  );
}

function Bottom({
  card,
}: {
  card?: string;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "22px",
        fontFamily:
          "Arial, sans-serif",
        fontSize: "9px",
        color: "#555",
      }}
    >
      {card &&
        `KART ${card.toUpperCase()} · `}
      NFC HUB
    </div>
  );
}