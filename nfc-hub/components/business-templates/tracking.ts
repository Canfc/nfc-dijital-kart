import type {
  BusinessData,
} from "./types";

export type TrackedLink =
  | "google"
  | "instagram"
  | "konum"
  | "telefon";

export function trackedHref(
  business: BusinessData,
  link: TrackedLink,
  card?: string
) {
  const base =
    `/click/${encodeURIComponent(
      business.slug
    )}/${link}`;

  if (!card) {
    return base;
  }

  return (
    `${base}?card=` +
    encodeURIComponent(
      card.toUpperCase()
    )
  );
}