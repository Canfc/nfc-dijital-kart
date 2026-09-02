"use client";

import {
  FormEvent,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const HUB_BASE_URL =
  "https://nfc-hub-omega.vercel.app";

export default function YeniIsletmePage() {
  const [businessName, setBusinessName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [googleUrl, setGoogleUrl] =
    useState("");

  const [instagramUrl, setInstagramUrl] =
    useState("");

  const [mapsUrl, setMapsUrl] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [cardCount, setCardCount] =
    useState(5);

  const [template, setTemplate] =
    useState("Cafe Premium");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  /* =========================
     KART ÖN EKİ
  ========================= */

  const prefix = useMemo(() => {
    const cleaned = slug
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase();

    if (cleaned.length >= 3) {
      return cleaned.slice(0, 3);
    }

    if (cleaned.length > 0) {
      return cleaned.padEnd(3, "X");
    }

    return "NFC";
  }, [slug]);

  /* =========================
     KART ÖNİZLEME
  ========================= */

  const cards = useMemo(() => {
    return Array.from(
      {
        length: cardCount,
      },
      (_, index) => {
        const number =
          String(index + 1).padStart(
            2,
            "0"
          );

        const code =
          `${prefix}${number}`;

        return {
          code,
          url:
            `${HUB_BASE_URL}/go/${code}`,
        };
      }
    );
  }, [cardCount, prefix]);

  /* =========================
     İŞLETME OLUŞTUR
  ========================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const response =
        await fetch(
          "/api/businesses/create",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              businessName,
              slug,
              googleUrl,
              instagramUrl,
              mapsUrl,
              phone,
              cardCount,
              template,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        setIsError(true);

        setMessage(
          result.error ||
            "İşletme oluşturulamadı."
        );

        return;
      }

      const createdCodes =
        result.cards
          ?.map(
            (card: {
              code: string;
            }) => card.code
          )
          .join(", ") || "";

      setIsError(false);

      setMessage(
        `İşletme başarıyla oluşturuldu. Kartlar: ${createdCodes}`
      );
    } catch (error) {
      console.error(
        "İşletme oluşturma hatası:",
        error
      );

      setIsError(true);

      setMessage(
        "Sunucuya bağlanırken bir hata oluştu."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at 25% 0%, #17212a 0%, #0a1016 35%, #05080b 100%)",

        color: "#f5f7fa",

        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "230px minmax(0, 1fr)",

          minHeight: "100vh",
        }}
        className="admin-layout"
      >
        {/* =========================
            SOL MENÜ
        ========================= */}

        <aside
          style={{
            borderRight:
              "1px solid #1f2933",

            background:
              "rgba(6, 10, 14, 0.95)",

            padding: "26px 18px",
          }}
          className="sidebar"
        >
          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: "11px",

              marginBottom: "34px",
            }}
          >
            <div
              style={{
                width: "42px",

                height: "42px",

                borderRadius: "13px",

                display: "grid",

                placeItems: "center",

                background:
                  "linear-gradient(145deg, #493716, #1d170d)",

                border:
                  "1px solid #80652e",

                color: "#e1b85d",

                fontWeight: "900",
              }}
            >
              N
            </div>

            <div>
              <div
                style={{
                  fontSize: "19px",

                  fontWeight: "800",
                }}
              >
                NFC HUB
              </div>

              <div
                style={{
                  color: "#7f8994",

                  fontSize: "10px",

                  letterSpacing:
                    "0.1em",

                  marginTop: "3px",
                }}
              >
                YÖNETİM PANELİ
              </div>
            </div>
          </div>

          <NavigationTitle
            title="GENEL"
          />

          <NavItem
            icon="⌂"
            title="Genel Bakış"
            href="/admin"
          />

          <NavigationTitle
            title="YÖNETİM"
          />

          <NavItem
            icon="▦"
            title="İşletmeler"
            href="/admin/isletmeler"
          />

          <NavItem
            icon="▭"
            title="Kartlar"
            href="/admin/kartlar"
          />

          <NavItem
            icon="↗"
            title="Yönlendirmeler"
            href="/admin/yonlendirmeler"
          />

          <NavItem
            icon="▥"
            title="İstatistikler"
            href="/admin/istatistikler"
          />

          <NavigationTitle
            title="ARAÇLAR"
          />

          <NavItem
            icon="▦"
            title="QR Kod Üretici"
            href="/admin/qr"
          />

          <NavItem
            icon="↻"
            title="Sayaç Yönetimi"
            href="/admin/sayac"
          />

          <div
            style={{
              marginTop: "30px",

              padding: "14px",

              background: "#10161d",

              border:
                "1px solid #232c35",

              borderRadius: "14px",
            }}
          >
            <div
              style={{
                fontWeight: "700",

                fontSize: "13px",
              }}
            >
              Admin
            </div>

            <div
              style={{
                color: "#76808b",

                fontSize: "11px",

                marginTop: "4px",
              }}
            >
              Sistem Yöneticisi
            </div>
          </div>
        </aside>

        {/* =========================
            ANA ALAN
        ========================= */}

        <section
          style={{
            padding: "34px",

            width: "100%",

            boxSizing:
              "border-box",
          }}
          className="content-area"
        >
          <header
            style={{
              marginBottom: "26px",
            }}
          >
            <div
              style={{
                color: "#d4a853",

                fontSize: "11px",

                fontWeight: "800",

                letterSpacing:
                  "0.15em",

                marginBottom: "7px",
              }}
            >
              NFC HUB
            </div>

            <h1
              style={{
                margin: 0,

                color: "#ffffff",

                fontSize: "31px",

                lineHeight: 1.15,
              }}
            >
              + Yeni İşletme Oluştur
            </h1>

            <p
              style={{
                color: "#919ba6",

                margin: "9px 0 0",

                fontSize: "14px",
              }}
            >
              İşletme bilgilerini
              ekleyin, kartları
              oluşturun ve merkezi
              yönlendirmeyi hazırlayın.
            </p>
          </header>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "minmax(0, 1.45fr) minmax(310px, 0.8fr)",

              gap: "18px",

              alignItems: "start",
            }}
            className="form-layout"
          >
            {/* =========================
                FORM
            ========================= */}

            <form
              onSubmit={handleSubmit}
              style={{
                background:
                  "linear-gradient(150deg, #111820, #0d1319)",

                border:
                  "1px solid #26313c",

                borderRadius: "20px",

                overflow: "hidden",

                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  padding:
                    "21px 22px",

                  borderBottom:
                    "1px solid #212a33",

                  display: "flex",

                  gap: "13px",

                  alignItems:
                    "center",
                }}
              >
                <div
                  style={{
                    width: "43px",

                    height: "43px",

                    borderRadius:
                      "13px",

                    display: "grid",

                    placeItems:
                      "center",

                    background:
                      "#271f11",

                    border:
                      "1px solid #665020",

                    fontSize: "20px",
                  }}
                >
                  🏪
                </div>

                <div>
                  <div
                    style={{
                      fontWeight:
                        "800",

                      color:
                        "#ffffff",
                    }}
                  >
                    İşletme Bilgileri
                  </div>

                  <div
                    style={{
                      color:
                        "#7f8994",

                      fontSize:
                        "11px",

                      marginTop:
                        "4px",
                    }}
                  >
                    İşletme
                    detaylarını ve
                    bağlantılarını
                    girin.
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "22px",
                }}
              >
                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    gap: "15px",
                  }}
                  className="two-columns"
                >
                  <Field
                    label="İşletme Adı"
                    required
                  >
                    <input
                      value={
                        businessName
                      }
                      onChange={(
                        event
                      ) =>
                        setBusinessName(
                          event.target
                            .value
                        )
                      }
                      required
                      placeholder="Örn. Container Coffee Works"
                      style={
                        inputStyle
                      }
                    />
                  </Field>

                  <Field
                    label="Kısa Kod / Slug"
                    required
                  >
                    <input
                      value={slug}
                      onChange={(
                        event
                      ) =>
                        setSlug(
                          event.target
                            .value
                            .toLowerCase()
                            .replace(
                              /[^a-z0-9-]/g,
                              ""
                            )
                        )
                      }
                      required
                      placeholder="container-coffee"
                      style={
                        inputStyle
                      }
                    />
                  </Field>
                </div>

                <Field
                  label="Google Yorum URL"
                  required
                >
                  <input
                    value={googleUrl}
                    onChange={(
                      event
                    ) =>
                      setGoogleUrl(
                        event.target
                          .value
                      )
                    }
                    required
                    type="url"
                    placeholder="https://search.google.com/local/writereview?..."
                    style={
                      inputStyle
                    }
                  />
                </Field>

                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    gap: "15px",
                  }}
                  className="two-columns"
                >
                  <Field label="Instagram URL">
                    <input
                      value={
                        instagramUrl
                      }
                      onChange={(
                        event
                      ) =>
                        setInstagramUrl(
                          event.target
                            .value
                        )
                      }
                      type="url"
                      placeholder="https://instagram.com/..."
                      style={
                        inputStyle
                      }
                    />
                  </Field>

                  <Field label="Konum / Maps URL">
                    <input
                      value={mapsUrl}
                      onChange={(
                        event
                      ) =>
                        setMapsUrl(
                          event.target
                            .value
                        )
                      }
                      type="url"
                      placeholder="https://maps.app.goo.gl/..."
                      style={
                        inputStyle
                      }
                    />
                  </Field>
                </div>

                <Field label="Telefon Numarası">
                  <input
                    value={phone}
                    onChange={(
                      event
                    ) =>
                      setPhone(
                        event.target
                          .value
                      )
                    }
                    placeholder="+90 5..."
                    style={
                      inputStyle
                    }
                  />
                </Field>

                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    gap: "15px",
                  }}
                  className="two-columns"
                >
                  <Field
                    label="Kart Sayısı"
                    required
                  >
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={
                        cardCount
                      }
                      onChange={(
                        event
                      ) => {
                        const value =
                          Number(
                            event.target
                              .value
                          );

                        setCardCount(
                          Math.min(
                            20,
                            Math.max(
                              1,
                              value ||
                                1
                            )
                          )
                        );
                      }}
                      style={
                        inputStyle
                      }
                    />
                  </Field>

                  <Field label="Tasarım Şablonu">
                    <select
                      value={template}
                      onChange={(
                        event
                      ) =>
                        setTemplate(
                          event.target
                            .value
                        )
                      }
                      style={
                        inputStyle
                      }
                    >
                      <option>
                        Cafe Premium
                      </option>

                      <option>
                        Restaurant Dark
                      </option>

                      <option>
                        Personal Premium
                      </option>

                      <option>
                        Minimal Business
                      </option>
                    </select>
                  </Field>
                </div>

                <div
                  style={{
                    marginTop:
                      "22px",

                    padding:
                      "14px 15px",

                    borderRadius:
                      "13px",

                    background:
                      "#211b10",

                    border:
                      "1px solid #5f4a1e",

                    color:
                      "#cbb47d",

                    fontSize:
                      "12px",

                    lineHeight:
                      1.55,
                  }}
                >
                  Her fiziksel kart
                  için benzersiz bir
                  kod ve merkezi NFC
                  yönlendirme
                  bağlantısı otomatik
                  oluşturulacaktır.
                </div>

                {/* =========================
                    SONUÇ MESAJI
                ========================= */}

                {message && (
                  <div
                    style={{
                      marginTop:
                        "18px",

                      padding:
                        "14px 15px",

                      borderRadius:
                        "12px",

                      background:
                        isError
                          ? "#2a1518"
                          : "#10251b",

                      border:
                        isError
                          ? "1px solid #70323a"
                          : "1px solid #285840",

                      color:
                        isError
                          ? "#ff9da5"
                          : "#72dfa0",

                      fontSize:
                        "12px",

                      lineHeight:
                        1.55,
                    }}
                  >
                    {message}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "flex-end",

                    marginTop:
                      "21px",
                  }}
                >
                  <button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    style={{
                      minWidth:
                        "250px",

                      padding:
                        "15px 22px",

                      border:
                        "1px solid #e2b453",

                      borderRadius:
                        "12px",

                      color:
                        "#17120a",

                      fontSize:
                        "13px",

                      fontWeight:
                        "900",

                      cursor:
                        isSubmitting
                          ? "wait"
                          : "pointer",

                      opacity:
                        isSubmitting
                          ? 0.65
                          : 1,

                      background:
                        "linear-gradient(135deg, #c89332, #efc967)",

                      boxShadow:
                        "0 12px 30px rgba(198,145,43,.15)",
                    }}
                  >
                    {isSubmitting
                      ? "OLUŞTURULUYOR..."
                      : "+ İŞLETMEYİ OLUŞTUR"}
                  </button>
                </div>
              </div>
            </form>

            {/* =========================
                KART ÖNİZLEME
            ========================= */}

            <aside
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "16px",
              }}
            >
              <div
                style={{
                  padding: "20px",

                  borderRadius:
                    "19px",

                  background:
                    "#10171e",

                  border:
                    "1px solid #26313b",
                }}
              >
                <div
                  style={{
                    fontWeight:
                      "800",

                    fontSize:
                      "16px",

                    color:
                      "#ffffff",
                  }}
                >
                  Oluşturulacak
                  Kartlar (
                  {cardCount})
                </div>

                <p
                  style={{
                    color:
                      "#7f8994",

                    fontSize:
                      "11px",

                    lineHeight:
                      1.5,

                    margin:
                      "7px 0 16px",
                  }}
                >
                  Kart kodları forma
                  göre otomatik
                  oluşturulur.
                </p>

                <div
                  style={{
                    display: "flex",

                    flexDirection:
                      "column",

                    gap: "8px",
                  }}
                >
                  {cards.map(
                    (
                      card,
                      index
                    ) => (
                      <div
                        key={
                          card.code
                        }
                        style={{
                          padding:
                            "12px",

                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap:
                            "11px",

                          background:
                            "#0b1117",

                          border:
                            "1px solid #2a3540",

                          borderRadius:
                            "12px",
                        }}
                      >
                        <div
                          style={{
                            width:
                              "31px",

                            height:
                              "31px",

                            flexShrink:
                              0,

                            display:
                              "grid",

                            placeItems:
                              "center",

                            borderRadius:
                              "9px",

                            background:
                              "#2d2413",

                            border:
                              "1px solid #665020",

                            color:
                              "#ddb35b",

                            fontSize:
                              "11px",

                            fontWeight:
                              "800",
                          }}
                        >
                          {index +
                            1}
                        </div>

                        <div
                          style={{
                            minWidth:
                              0,

                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              color:
                                "#ffffff",

                              fontSize:
                                "12px",

                              fontWeight:
                                "800",
                            }}
                          >
                            {
                              card.code
                            }
                          </div>

                          <div
                            style={{
                              color:
                                "#707b86",

                              fontSize:
                                "9px",

                              marginTop:
                                "4px",

                              overflow:
                                "hidden",

                              whiteSpace:
                                "nowrap",

                              textOverflow:
                                "ellipsis",
                            }}
                          >
                            {
                              card.url
                            }
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div
                style={{
                  padding: "20px",

                  borderRadius:
                    "19px",

                  background:
                    "#10171e",

                  border:
                    "1px solid #26313b",
                }}
              >
                <div
                  style={{
                    color:
                      "#ffffff",

                    fontWeight:
                      "800",

                    marginBottom:
                      "14px",
                  }}
                >
                  Oluşturulacaklar
                </div>

                <Checklist
                  text="İşletme kaydı oluşturulacak"
                />

                <Checklist
                  text={`${cardCount} adet NFC kart kodu üretilecek`}
                />

                <Checklist
                  text="Yönlendirme kayıtları hazırlanacak"
                />

                <Checklist
                  text="Kart bazlı sayaç sistemi hazırlanacak"
                />

                <Checklist
                  text="İstatistik altyapısı oluşturulacak"
                />
              </div>

              <div
                style={{
                  padding: "17px",

                  borderRadius:
                    "15px",

                  background:
                    "linear-gradient(135deg, #0f2a20, #0d1c17)",

                  border:
                    "1px solid #285840",
                }}
              >
                <div
                  style={{
                    color:
                      "#67d895",

                    fontWeight:
                      "800",

                    fontSize:
                      "13px",
                  }}
                >
                  Güvenli merkezi
                  yönlendirme
                </div>

                <p
                  style={{
                    color:
                      "#8ca99b",

                    fontSize:
                      "11px",

                    lineHeight:
                      1.5,

                    margin:
                      "7px 0 0",
                  }}
                >
                  NFC kartların hedef
                  adresleri daha sonra
                  fiziksel karta
                  dokunmadan
                  değiştirilebilecek.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @media (max-width: 1050px) {
          .admin-layout {
            grid-template-columns: 1fr !important;
          }

          .sidebar {
            display: none !important;
          }
        }

        @media (max-width: 850px) {
          .form-layout {
            grid-template-columns: 1fr !important;
          }

          .content-area {
            padding: 22px 14px 45px !important;
          }
        }

        @media (max-width: 600px) {
          .two-columns {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================
   FORM ALANI
========================= */

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      style={{
        display: "block",
        marginBottom: "17px",
      }}
    >
      <div
        style={{
          color: "#d9dee4",
          fontSize: "12px",
          fontWeight: "700",
          marginBottom: "7px",
        }}
      >
        {label}

        {required && (
          <span
            style={{
              color: "#d4a853",
              marginLeft: "4px",
            }}
          >
            *
          </span>
        )}
      </div>

      {children}
    </label>
  );
}

/* =========================
   MENÜ BAŞLIĞI
========================= */

function NavigationTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div
      style={{
        color: "#525d67",
        fontSize: "9px",
        fontWeight: "800",
        letterSpacing: "0.13em",
        margin: "23px 8px 9px",
      }}
    >
      {title}
    </div>
  );
}

/* =========================
   MENÜ ÖĞESİ
========================= */

function NavItem({
  icon,
  title,
  href,
}: {
  icon: string;
  title: string;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        gap: "11px",
        alignItems: "center",
        color: "#a6afb8",
        fontSize: "12px",
        padding: "10px 9px",
        borderRadius: "10px",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: "18px",
          textAlign: "center",
          color: "#89939d",
        }}
      >
        {icon}
      </span>

      {title}
    </a>
  );
}

/* =========================
   CHECKLIST
========================= */

function Checklist({
  text,
}: {
  text: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "9px",
        alignItems: "center",
        color: "#a7b0b9",
        fontSize: "11px",
        margin: "11px 0",
      }}
    >
      <span
        style={{
          color: "#53d58a",
        }}
      >
        ✓
      </span>

      {text}
    </div>
  );
}

/* =========================
   INPUT TASARIMI
========================= */

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  color: "#ffffff",
  background: "#0b1117",
  border: "1px solid #303b46",
  borderRadius: "10px",
  outline: "none",
  fontSize: "13px",
};