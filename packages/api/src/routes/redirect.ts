import { isExpired } from "@csc/shared";
import { Hono } from "hono";
import { getSurl, removeExpiredSurl } from "../lib/kv";
import type { AppEnv } from "../types";

export const redirectRoutes = new Hono<AppEnv>();

redirectRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug").toLowerCase();
  const record = await getSurl(c.env.SURL_KV, slug);

  if (!record) {
    return c.text("Not Found", 404);
  }

  if (isExpired(record)) {
    await removeExpiredSurl(c.env.SURL_KV, record.slug, record.userId);
    return c.text("Gone", 410);
  }

  return c.redirect(record.url, 302);
});
