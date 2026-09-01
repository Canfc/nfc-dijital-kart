import { cookies } from "next/headers";

import {
  verifyAdminSessionToken,
} from "../../../lib/admin-session";

import YeniIsletmeClient from "./YeniIsletmeClient";

export const dynamic = "force-dynamic";

export default async function YeniIsletmePage() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get(
      "admin_session"
    )?.value;

  const authenticated =
    verifyAdminSessionToken(
      sessionToken
    );

  if (!authenticated) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #17212a 0%, #0a1016 38%, #05080b 100%)",
          color: "#ffffff",
          fontFamily:
            "Arial, Helvetica, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "22px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "410px",
            padding: "32px",
            borderRadius: "22px",
            background:
              "linear-gradient(145deg, #111820, #0b1117)",
            border:
              "1px solid #29343e",
            boxShadow:
              "0 30px 80px rgba(0,0,0,.5)",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              display: "grid",
              placeItems: "center",
              borderRadius: "15px",
              background: "#2a2112",
              border:
                "1px solid #6c5422",
              color: "#e0b75a",
              fontWeight: "900",
              fontSize: "20px",
              marginBottom: "22px",
            }}
          >
            N
          </div>

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
              fontSize: "27px",
            }}
          >
            Yönetici Girişi
          </h1>

          <p
            style={{
              color: "#8d98a3",
              fontSize: "13px",
              lineHeight: 1.55,
              margin:
                "10px 0 23px",
            }}
          >
            İşletme ve NFC kart
            yönetim paneline erişmek
            için yönetici şifrenizi
            girin.
          </p>

          <form
            action="/api/admin-login"
            method="POST"
          >
            <label
              style={{
                display: "block",
                color: "#cbd1d7",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "7px",
              }}
            >
              Yönetici şifresi
            </label>

            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Şifrenizi girin"
              style={{
                width: "100%",
                boxSizing:
                  "border-box",
                padding:
                  "14px 15px",
                borderRadius: "11px",
                border:
                  "1px solid #34404b",
                background: "#080d12",
                color: "#ffffff",
                outline: "none",
                fontSize: "15px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "14px",
                padding: "14px",
                borderRadius: "11px",
                border:
                  "1px solid #e0b14f",
                background:
                  "linear-gradient(135deg, #c99232, #ecc560)",
                color: "#17120a",
                fontWeight: "900",
                cursor: "pointer",
              }}
            >
              Panele Giriş Yap
            </button>
          </form>
        </section>
      </main>
    );
  }

  return <YeniIsletmeClient />;
}