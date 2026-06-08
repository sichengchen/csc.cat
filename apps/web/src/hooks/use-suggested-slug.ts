import { useCallback, useState } from "react";

type UseSuggestedSlugOptions = {
  enabled: boolean;
  getToken: () => Promise<string | null>;
  suggestSlug: (token: string | null) => Promise<string>;
  onSuggestedSlug: (slug: string) => void;
  onError: (error: unknown) => void;
};

export function useSuggestedSlug({
  enabled,
  getToken,
  suggestSlug,
  onSuggestedSlug,
  onError,
}: UseSuggestedSlugOptions) {
  const [suggesting, setSuggesting] = useState(false);

  const refreshSuggestedSlug = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setSuggesting(true);
    try {
      const token = await getToken();
      onSuggestedSlug(await suggestSlug(token));
    } catch (error) {
      onError(error);
    } finally {
      setSuggesting(false);
    }
  }, [enabled, getToken, onError, onSuggestedSlug, suggestSlug]);

  return { suggesting, refreshSuggestedSlug };
}
