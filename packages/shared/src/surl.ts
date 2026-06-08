import { z } from "zod";
import { RESERVED_SLUGS } from "./redirects";
import { EXPIRY_PRESETS, type ExpiryPreset } from "./expiry";
import { SLUG_PATTERN } from "./slug";

export { computeExpiresAt, EXPIRY_PRESETS, isExpired, type ExpiryPreset } from "./expiry";
export {
  generateRandomSlug,
  getSlugValidationError,
  SLUG_PATTERN,
  type SlugAvailability,
} from "./slug";
export type { ApiErrorCode } from "./api-errors";

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

export const surlRecordSchema = z.object({
  slug: z.string(),
  url: z.string().url(),
  userId: z.string(),
  createdAt: z.number(),
  expiresAt: z.number().nullable(),
});

export type SurlRecord = z.infer<typeof surlRecordSchema>;

export type SurlListItem = {
  slug: string;
  url: string;
  createdAt: number;
  expiresAt: number | null;
  shortUrl: string;
  expired: boolean;
};
