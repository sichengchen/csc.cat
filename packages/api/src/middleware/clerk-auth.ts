import { verifyToken } from "@clerk/backend";
import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../types";

export const clerkAuth = createMiddleware<AppEnv>(async (c, next) => {
  const authorization = c.req.header("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return c.json({ error: "unauthorized" as const }, 401);
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (!token) {
    return c.json({ error: "unauthorized" as const }, 401);
  }

  try {
    const payload = await verifyToken(token, {
      secretKey: c.env.CLERK_SECRET_KEY,
      authorizedParties: [
        "https://surl.scchan.com",
        "http://localhost:8787",
        "http://127.0.0.1:8787",
      ],
    });

    const userId = payload.sub;
    if (!userId) {
      return c.json({ error: "unauthorized" as const }, 401);
    }

    c.set("userId", userId);
    await next();
  } catch {
    return c.json({ error: "unauthorized" as const }, 401);
  }
});
