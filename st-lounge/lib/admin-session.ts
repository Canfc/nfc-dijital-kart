import crypto from "crypto";

const SESSION_DURATION =
  60 * 60 * 12; // 12 saat

function getSecret() {
  const secret =
    process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET tanımlı değil."
    );
  }

  return secret;
}

export function createAdminSessionToken() {
  const expiresAt =
    Math.floor(Date.now() / 1000) +
    SESSION_DURATION;

  const payload =
    `admin:${expiresAt}`;

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  return `${expiresAt}.${signature}`;
}

export function verifyAdminSessionToken(
  token?: string
) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [expiresString, providedSignature] =
    parts;

  const expiresAt =
    Number(expiresString);

  if (
    !Number.isFinite(expiresAt) ||
    expiresAt <
      Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const payload =
    `admin:${expiresAt}`;

  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(
        providedSignature,
        "hex"
      ),
      Buffer.from(
        expectedSignature,
        "hex"
      )
    );
  } catch {
    return false;
  }
}

export const adminSessionMaxAge =
  SESSION_DURATION;