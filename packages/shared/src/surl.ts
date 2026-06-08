import { z } from "zod";
import { RESERVED_SLUGS } from "./redirects";

export const EXPIRY_PRESETS = ["1d", "7d", "14d", "1mo", "3mo", "6mo", "1year", "forever"] as const;

export type ExpiryPreset = (typeof EXPIRY_PRESETS)[number];

export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

const SLUG_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomSlug(length = 6): string {
  const size = Math.max(3, Math.min(32, length));
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);

  let slug = "";
  for (let index = 0; index < size; index++) {
    slug += SLUG_ALPHABET[bytes[index]! % SLUG_ALPHABET.length];
  }

  return slug;
}

export function getSlugValidationError(slug: string): ApiErrorCode | null {
  const normalized = slug.trim().toLowerCase();
  if (!SLUG_PATTERN.test(normalized)) {
    return "invalid_slug";
  }
  if (RESERVED_SLUGS.has(normalized)) {
    return "slug_reserved";
  }
  return null;
}

export const createSurlSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(32)
    .regex(SLUG_PATTERN, "invalid_slug")
    .refine((slug) => !RESERVED_SLUGS.has(slug), "slug_reserved"),
  url: z
    .string()
    .url()
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    }, "invalid_url"),
  expiry: z.enum(EXPIRY_PRESETS),
});

export type CreateSurlInput = z.infer<typeof createSurlSchema>;

export type SurlRecord = {
  slug: string;
  url: string;
  userId: string;
  createdAt: number;
  expiresAt: number | null;
};

export type SurlListItem = {
  slug: string;
  url: string;
  createdAt: number;
  expiresAt: number | null;
  shortUrl: string;
  expired: boolean;
};

export const EXPIRY_DURATIONS_MS: Record<Exclude<ExpiryPreset, "forever">, number> = {
  "1d": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "14d": 14 * 24 * 60 * 60 * 1000,
  "1mo": 30 * 24 * 60 * 60 * 1000,
  "3mo": 90 * 24 * 60 * 60 * 1000,
  "6mo": 180 * 24 * 60 * 60 * 1000,
  "1year": 365 * 24 * 60 * 60 * 1000,
};

export function computeExpiresAt(createdAt: number, expiry: ExpiryPreset): number | null {
  if (expiry === "forever") {
    return null;
  }
  return createdAt + EXPIRY_DURATIONS_MS[expiry];
}

export function isExpired(record: Pick<SurlRecord, "expiresAt">, now = Date.now()): boolean {
  return record.expiresAt !== null && record.expiresAt <= now;
}

export const SHORT_URL_ORIGIN = "https://csc.cat";

export function buildShortUrl(slug: string): string {
  return `${SHORT_URL_ORIGIN}/s/${slug}`;
}

export type ApiErrorCode =
  | "unauthorized"
  | "invalid_slug"
  | "slug_reserved"
  | "slug_taken"
  | "invalid_url"
  | "not_found"
  | "forbidden"
  | "validation_error";

export type SlugAvailability = {
  available: boolean;
  reason?: ApiErrorCode;
};
