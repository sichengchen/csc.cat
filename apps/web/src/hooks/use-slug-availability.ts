import type { ApiErrorCode, SlugAvailability } from "@csc/shared";
import { useEffect, useState } from "react";

export type SlugStatus = "idle" | "checking" | "available" | "unavailable";

type UseSlugAvailabilityOptions = {
  enabled: boolean;
  slug: string;
  getToken: () => Promise<string | null>;
  checkAvailability: (token: string | null, slug: string) => Promise<SlugAvailability>;
  debounceMs?: number;
};

export function useSlugAvailability({
  enabled,
  slug,
  getToken,
  checkAvailability,
  debounceMs = 300,
}: UseSlugAvailabilityOptions) {
  const [status, setStatus] = useState<SlugStatus>("idle");
  const [reason, setReason] = useState<ApiErrorCode | null>(null);

  useEffect(() => {
    if (!enabled || !slug.trim()) {
      setStatus("idle");
      setReason(null);
      return;
    }

    const normalized = slug.trim().toLowerCase();
    setStatus("checking");

    const timeout = window.setTimeout(() => {
      void (async () => {
        try {
          const token = await getToken();
          const result = await checkAvailability(token, normalized);
          if (result.available) {
            setStatus("available");
            setReason(null);
          } else {
            setStatus("unavailable");
            setReason(result.reason ?? "slug_taken");
          }
        } catch {
          setStatus("idle");
          setReason(null);
        }
      })();
    }, debounceMs);

    return () => window.clearTimeout(timeout);
  }, [checkAvailability, debounceMs, enabled, getToken, slug]);

  return { status, reason };
}
