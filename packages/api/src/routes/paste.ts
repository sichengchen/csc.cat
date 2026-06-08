import {
  buildContentPreview,
  buildPasteUrl,
  computeExpiresAt,
  createPasteSchema,
  generateRandomSlug,
  getSlugValidationError,
  isExpired,
  type PasteListItem,
  type PastePublicItem,
} from "@csc/shared";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { clerkAuth } from "../middleware/clerk-auth";
import {
  addUserPasteSlug,
  deletePaste,
  getPaste,
  getUserPasteSlugs,
  putPaste,
  removeExpiredPaste,
} from "../lib/paste-kv";
import type { AppEnv } from "../types";

export const pasteRoutes = new Hono<AppEnv>();

async function isPasteSlugAvailable(kv: KVNamespace, slug: string): Promise<boolean> {
  if (getSlugValidationError(slug)) {
    return false;
  }
  const record = await getPaste(kv, slug.toLowerCase());
  return !record;
}

pasteRoutes.get("/suggest-slug", clerkAuth, async (c) => {
  for (let attempt = 0; attempt < 20; attempt++) {
    const slug = generateRandomSlug();
    if (await isPasteSlugAvailable(c.env.SURL_KV, slug)) {
      return c.json({ slug });
    }
  }
  return c.json({ error: "validation_error" as const }, 500);
});

pasteRoutes.get("/check/:slug", clerkAuth, async (c) => {
  const slug = c.req.param("slug").toLowerCase();
  const validationError = getSlugValidationError(slug);
  if (validationError) {
    return c.json({ available: false, reason: validationError });
  }

  const record = await getPaste(c.env.SURL_KV, slug);
  if (record) {
    return c.json({ available: false, reason: "slug_taken" as const });
  }

  return c.json({ available: true });
});

pasteRoutes.get("/", clerkAuth, async (c) => {
  const userId = c.get("userId");
  const slugs = await getUserPasteSlugs(c.env.SURL_KV, userId);
  const now = Date.now();

  const items: PasteListItem[] = [];

  for (const slug of slugs) {
    const record = await getPaste(c.env.SURL_KV, slug);
    if (!record) {
      continue;
    }

    const expired = isExpired(record, now);
    items.push({
      slug: record.slug,
      contentPreview: buildContentPreview(record.content),
      language: record.language,
      createdAt: record.createdAt,
      expiresAt: record.expiresAt,
      pasteUrl: buildPasteUrl(record.slug),
      expired,
    });
  }

  items.sort((a, b) => b.createdAt - a.createdAt);

  return c.json({ pastes: items });
});

pasteRoutes.post("/", clerkAuth, zValidator("json", createPasteSchema), async (c) => {
  const userId = c.get("userId");
  const body = c.req.valid("json");
  const slug = body.slug.toLowerCase();

  const existing = await getPaste(c.env.SURL_KV, slug);
  if (existing) {
    return c.json({ error: "slug_taken" as const }, 409);
  }

  const createdAt = Date.now();
  const record = {
    slug,
    content: body.content,
    language: body.language,
    userId,
    createdAt,
    expiresAt: computeExpiresAt(createdAt, body.expiry),
  };

  await putPaste(c.env.SURL_KV, record);
  await addUserPasteSlug(c.env.SURL_KV, userId, slug);

  return c.json(
    {
      paste: {
        slug: record.slug,
        contentPreview: buildContentPreview(record.content),
        language: record.language,
        createdAt: record.createdAt,
        expiresAt: record.expiresAt,
        pasteUrl: buildPasteUrl(record.slug),
        expired: false,
      } satisfies PasteListItem,
    },
    201,
  );
});

pasteRoutes.delete("/:slug", clerkAuth, async (c) => {
  const userId = c.get("userId");
  const slug = c.req.param("slug").toLowerCase();
  const deleted = await deletePaste(c.env.SURL_KV, slug, userId);

  if (!deleted) {
    const record = await getPaste(c.env.SURL_KV, slug);
    if (!record) {
      return c.json({ error: "not_found" as const }, 404);
    }
    return c.json({ error: "forbidden" as const }, 403);
  }

  return c.json({ ok: true });
});

pasteRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug").toLowerCase();
  const record = await getPaste(c.env.SURL_KV, slug);

  if (!record) {
    return c.json({ error: "not_found" as const }, 404);
  }

  if (isExpired(record)) {
    await removeExpiredPaste(c.env.SURL_KV, record.slug, record.userId);
    return c.json({ error: "not_found" as const }, 410);
  }

  const paste: PastePublicItem = {
    slug: record.slug,
    content: record.content,
    language: record.language,
    createdAt: record.createdAt,
    expiresAt: record.expiresAt,
  };

  return c.json({ paste });
});
