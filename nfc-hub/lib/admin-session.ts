import crypto from "crypto";

const SESSION_DURATION = 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

export function createAdminSessionToken() {
  const secret = getSecret();

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET environment variable tanımlı değil."
    );
  }

  const expiresAt =
    Math.floor(Date.now() / 1000) + SESSION_DURATION;

  const payload = `admin:${expiresAt}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `${expiresAt}.${signature}`;
}

export function verifyAdminSessionToken(
  token?: string
) {
  const secret = getSecret();

  if (!secret || !token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [expiresString, providedSignature] = parts;

  const expiresAt = Number(expiresString);

  if (
    !Number.isFinite(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  if (!/^[a-f0-9]{64}$/i.test(providedSignature)) {
    return false;
  }

  const payload = `admin:${expiresAt}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(providedSignature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export const adminSessionMaxAge =
  SESSION_DURATION;