import {
  buildContentPreview,
  computeExpiresAt,
  createPasteSchema,
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
import {
  buildPublicResourceUrl,
  checkSlugAvailability,
  suggestAvailableSlug,
} from "../lib/slug-route-helpers";
import type { AppEnv } from "../types";

export const pasteRoutes = new Hono<AppEnv>();

pasteRoutes.get("/suggest-slug", clerkAuth, async (c) => {
  const slug = await suggestAvailableSlug(c.env.SURL_KV, getPaste);
  if (slug) {
    return c.json({ slug });
  }
  return c.json({ error: "validation_error" as const }, 500);
});

pasteRoutes.get("/check/:slug", clerkAuth, async (c) => {
  return c.json(await checkSlugAvailability(c.env.SURL_KV, c.req.param("slug"), getPaste));
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
      pasteUrl: buildPublicResourceUrl("/p", record.slug),
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
        pasteUrl: buildPublicResourceUrl("/p", record.slug),
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
