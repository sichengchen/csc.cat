type SlugOwnedRecord = {
  slug: string;
  userId: string;
};

type SlugResourceKvConfig<TRecord extends SlugOwnedRecord> = {
  itemPrefix: string;
  userPrefix: string;
  parseRecord: (value: unknown) => TRecord | null;
};

export function createSlugResourceKv<TRecord extends SlugOwnedRecord>({
  itemPrefix,
  userPrefix,
  parseRecord,
}: SlugResourceKvConfig<TRecord>) {
  function itemKey(slug: string): string {
    return `${itemPrefix}:${slug}`;
  }

  function userKey(userId: string): string {
    return `${userPrefix}:${userId}`;
  }

  async function getRecord(kv: KVNamespace, slug: string): Promise<TRecord | null> {
    const raw = await kv.get(itemKey(slug), "json");
    return parseRecord(raw);
  }

  async function putRecord(kv: KVNamespace, record: TRecord): Promise<void> {
    await kv.put(itemKey(record.slug), JSON.stringify(record));
  }

  async function getUserSlugs(kv: KVNamespace, userId: string): Promise<string[]> {
    const raw = await kv.get(userKey(userId), "json");
    if (!Array.isArray(raw)) {
      return [];
    }
    return raw.filter((item): item is string => typeof item === "string");
  }

  async function addUserSlug(kv: KVNamespace, userId: string, slug: string): Promise<void> {
    const slugs = await getUserSlugs(kv, userId);
    if (!slugs.includes(slug)) {
      slugs.push(slug);
      await kv.put(userKey(userId), JSON.stringify(slugs));
    }
  }

  async function removeRecord(kv: KVNamespace, slug: string, userId: string): Promise<void> {
    await kv.delete(itemKey(slug));
    const slugs = await getUserSlugs(kv, userId);
    const next = slugs.filter((item) => item !== slug);
    await kv.put(userKey(userId), JSON.stringify(next));
  }

  async function deleteRecord(kv: KVNamespace, slug: string, userId: string): Promise<boolean> {
    const record = await getRecord(kv, slug);
    if (!record || record.userId !== userId) {
      return false;
    }

    await removeRecord(kv, slug, userId);
    return true;
  }

  return {
    itemKey,
    userKey,
    getRecord,
    putRecord,
    deleteRecord,
    getUserSlugs,
    addUserSlug,
    removeRecord,
  };
}
