import { Hono } from "hono";
import { redirectRoutes } from "./routes/redirect";
import { surlRoutes } from "./routes/surl";
import type { AppEnv } from "./types";

export const app = new Hono<AppEnv>();

app.route("/api/surl", surlRoutes);
app.route("/s", redirectRoutes);

app.all("*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});
