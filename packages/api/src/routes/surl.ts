import {
  computeExpiresAt,
  createSurlSchema,
  isExpired,
  type SurlListItem,
} from "@csc/shared";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { clerkAuth } from "../middleware/clerk-auth";
import { addUserSlug, deleteSurl, getSurl, getUserSlugs, putSurl } from "../lib/kv";
import {
  buildPublicResourceUrl,
  checkSlugAvailability,
  suggestAvailableSlug,
} from "../lib/slug-route-helpers";
import type { AppEnv } from "../types";

export const surlRoutes = new Hono<AppEnv>();

surlRoutes.use("*", clerkAuth);

surlRoutes.get("/suggest-slug", async (c) => {
  const slug = await suggestAvailableSlug(c.env.SURL_KV, getSurl);
  if (slug) {
    return c.json({ slug });
  }
  return c.json({ error: "validation_error" as const }, 500);
});

surlRoutes.get("/check/:slug", async (c) => {
  return c.json(await checkSlugAvailability(c.env.SURL_KV, c.req.param("slug"), getSurl));
});

surlRoutes.get("/", async (c) => {
  const userId = c.get("userId");
  const slugs = await getUserSlugs(c.env.SURL_KV, userId);
  const now = Date.now();
  const requestUrl = c.req.url;

  const items: SurlListItem[] = [];

  for (const slug of slugs) {
    const record = await getSurl(c.env.SURL_KV, slug);
    if (!record) {
      continue;
    }

    const expired = isExpired(record, now);
    items.push({
      slug: record.slug,
      url: record.url,
      createdAt: record.createdAt,
      expiresAt: record.expiresAt,
      shortUrl: buildPublicResourceUrl(requestUrl, "/s", record.slug),
      expired,
    });
  }

  items.sort((a, b) => b.createdAt - a.createdAt);

  return c.json({ links: items });
});

surlRoutes.post("/", zValidator("json", createSurlSchema), async (c) => {
  const userId = c.get("userId");
  const body = c.req.valid("json");
  const slug = body.slug.toLowerCase();

  const existing = await getSurl(c.env.SURL_KV, slug);
  if (existing) {
    return c.json({ error: "slug_taken" as const }, 409);
  }

  const createdAt = Date.now();
  const record = {
    slug,
    url: body.url,
    userId,
    createdAt,
    expiresAt: computeExpiresAt(createdAt, body.expiry),
  };

  await putSurl(c.env.SURL_KV, record);
  await addUserSlug(c.env.SURL_KV, userId, slug);

  return c.json(
    {
      link: {
        slug: record.slug,
        url: record.url,
        createdAt: record.createdAt,
        expiresAt: record.expiresAt,
        shortUrl: buildPublicResourceUrl(c.req.url, "/s", record.slug),
        expired: false,
      } satisfies SurlListItem,
    },
    201,
  );
});

surlRoutes.delete("/:slug", async (c) => {
  const userId = c.get("userId");
  const slug = c.req.param("slug").toLowerCase();
  const deleted = await deleteSurl(c.env.SURL_KV, slug, userId);

  if (!deleted) {
    const record = await getSurl(c.env.SURL_KV, slug);
    if (!record) {
      return c.json({ error: "not_found" as const }, 404);
    }
    return c.json({ error: "forbidden" as const }, 403);
  }

  return c.json({ ok: true });
});
