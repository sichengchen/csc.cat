import { Hono } from "hono";
import { pasteRoutes } from "./routes/paste";
import { pasteViewRoutes } from "./routes/paste-view";
import { redirectRoutes } from "./routes/redirect";
import { surlRoutes } from "./routes/surl";
import type { AppEnv } from "./types";

export const app = new Hono<AppEnv>();

app.route("/api/surl", surlRoutes);
app.route("/api/paste", pasteRoutes);
app.route("/s", redirectRoutes);
app.route("/p", pasteViewRoutes);

app.all("*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});
