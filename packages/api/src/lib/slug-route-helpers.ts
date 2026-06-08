import {
  generateRandomSlug,
  getSlugValidationError,
  type SlugAvailability,
} from "@csc/shared";

type GetRecordBySlug<TRecord> = (kv: KVNamespace, slug: string) => Promise<TRecord | null>;

export async function isSlugAvailable<TRecord>(
  kv: KVNamespace,
  slug: string,
  getRecord: GetRecordBySlug<TRecord>,
): Promise<boolean> {
  if (getSlugValidationError(slug)) {
    return false;
  }
  const record = await getRecord(kv, slug.toLowerCase());
  return !record;
}

export async function suggestAvailableSlug<TRecord>(
  kv: KVNamespace,
  getRecord: GetRecordBySlug<TRecord>,
): Promise<string | null> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const slug = generateRandomSlug();
    if (await isSlugAvailable(kv, slug, getRecord)) {
      return slug;
    }
  }
  return null;
}

export async function checkSlugAvailability<TRecord>(
  kv: KVNamespace,
  slug: string,
  getRecord: GetRecordBySlug<TRecord>,
): Promise<SlugAvailability> {
  const normalized = slug.toLowerCase();
  const validationError = getSlugValidationError(normalized);
  if (validationError) {
    return { available: false, reason: validationError };
  }

  const record = await getRecord(kv, normalized);
  if (record) {
    return { available: false, reason: "slug_taken" };
  }

  return { available: true };
}

export function buildPublicResourceUrl(requestUrl: string, pathPrefix: string, slug: string): string {
  const origin = new URL(requestUrl).origin;
  return `${origin}${pathPrefix}/${slug}`;
}
