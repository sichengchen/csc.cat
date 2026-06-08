import type { SurlRecord } from "@csc/shared";

export function slugKey(slug: string): string {
  return `slug:${slug}`;
}

export function userKey(userId: string): string {
  return `user:${userId}`;
}

export async function getSurl(kv: KVNamespace, slug: string): Promise<SurlRecord | null> {
  const raw = await kv.get(slugKey(slug), "json");
  if (!raw) {
    return null;
  }
  return raw as SurlRecord;
}

export async function putSurl(kv: KVNamespace, record: SurlRecord): Promise<void> {
  await kv.put(slugKey(record.slug), JSON.stringify(record));
}

export async function deleteSurl(kv: KVNamespace, slug: string, userId: string): Promise<boolean> {
  const record = await getSurl(kv, slug);
  if (!record || record.userId !== userId) {
    return false;
  }

  await kv.delete(slugKey(slug));

  const slugs = await getUserSlugs(kv, userId);
  const next = slugs.filter((item) => item !== slug);
  await kv.put(userKey(userId), JSON.stringify(next));

  return true;
}

export async function getUserSlugs(kv: KVNamespace, userId: string): Promise<string[]> {
  const raw = await kv.get(userKey(userId), "json");
  if (!raw || !Array.isArray(raw)) {
    return [];
  }
  return raw as string[];
}

export async function addUserSlug(kv: KVNamespace, userId: string, slug: string): Promise<void> {
  const slugs = await getUserSlugs(kv, userId);
  if (!slugs.includes(slug)) {
    slugs.push(slug);
    await kv.put(userKey(userId), JSON.stringify(slugs));
  }
}

export async function removeExpiredSurl(
  kv: KVNamespace,
  slug: string,
  userId: string,
): Promise<void> {
  await kv.delete(slugKey(slug));
  const slugs = await getUserSlugs(kv, userId);
  const next = slugs.filter((item) => item !== slug);
  await kv.put(userKey(userId), JSON.stringify(next));
}
