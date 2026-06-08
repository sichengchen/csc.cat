import { RESERVED_SLUGS } from "./redirects";
import type { ApiErrorCode } from "./api-errors";

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

export type SlugAvailability = {
  available: boolean;
  reason?: ApiErrorCode;
};
