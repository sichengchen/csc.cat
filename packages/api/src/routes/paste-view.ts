import { isExpired } from "@csc/shared";
import { Hono } from "hono";
import { getPaste, removeExpiredPaste } from "../lib/paste-kv";
import type { AppEnv } from "../types";

export const pasteViewRoutes = new Hono<AppEnv>();

function wantsRawResponse(c: {
  req: { query: (key: string) => string | undefined; header: (name: string) => string | undefined };
}): boolean {
  if (c.req.query("raw") === "1") {
    return true;
  }

  const accept = c.req.header("Accept") ?? "";
  return accept.includes("text/plain") && !accept.includes("text/html");
}

pasteViewRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug").toLowerCase();

  if (!wantsRawResponse(c)) {
    return c.env.ASSETS.fetch(c.req.raw);
  }

  const record = await getPaste(c.env.SURL_KV, slug);

  if (!record) {
    return c.text("Not Found", 404);
  }

  if (isExpired(record)) {
    await removeExpiredPaste(c.env.SURL_KV, record.slug, record.userId);
    return c.text("Gone", 410);
  }

  return c.text(record.content, 200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
});
