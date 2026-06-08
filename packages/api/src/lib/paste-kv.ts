import type { PasteRecord } from "@csc/shared";

export function pasteSlugKey(slug: string): string {
  return `paste:${slug}`;
}

export function pasteUserKey(userId: string): string {
  return `paste-user:${userId}`;
}

export async function getPaste(kv: KVNamespace, slug: string): Promise<PasteRecord | null> {
  const raw = await kv.get(pasteSlugKey(slug), "json");
  if (!raw) {
    return null;
  }
  return raw as PasteRecord;
}

export async function putPaste(kv: KVNamespace, record: PasteRecord): Promise<void> {
  await kv.put(pasteSlugKey(record.slug), JSON.stringify(record));
}

export async function deletePaste(kv: KVNamespace, slug: string, userId: string): Promise<boolean> {
  const record = await getPaste(kv, slug);
  if (!record || record.userId !== userId) {
    return false;
  }

  await kv.delete(pasteSlugKey(slug));

  const slugs = await getUserPasteSlugs(kv, userId);
  const next = slugs.filter((item) => item !== slug);
  await kv.put(pasteUserKey(userId), JSON.stringify(next));

  return true;
}

export async function getUserPasteSlugs(kv: KVNamespace, userId: string): Promise<string[]> {
  const raw = await kv.get(pasteUserKey(userId), "json");
  if (!raw || !Array.isArray(raw)) {
    return [];
  }
  return raw as string[];
}

export async function addUserPasteSlug(
  kv: KVNamespace,
  userId: string,
  slug: string,
): Promise<void> {
  const slugs = await getUserPasteSlugs(kv, userId);
  if (!slugs.includes(slug)) {
    slugs.push(slug);
    await kv.put(pasteUserKey(userId), JSON.stringify(slugs));
  }
}

export async function removeExpiredPaste(
  kv: KVNamespace,
  slug: string,
  userId: string,
): Promise<void> {
  await kv.delete(pasteSlugKey(slug));
  const slugs = await getUserPasteSlugs(kv, userId);
  const next = slugs.filter((item) => item !== slug);
  await kv.put(pasteUserKey(userId), JSON.stringify(next));
}
