import { useCallback, useState } from "react";

type UseAuthenticatedResourceListOptions<TItem> = {
  enabled: boolean;
  getToken: () => Promise<string | null>;
  listItems: (token: string | null) => Promise<TItem[]>;
  onError: (error: unknown) => void;
};

export function useAuthenticatedResourceList<TItem>({
  enabled,
  getToken,
  listItems,
  onError,
}: UseAuthenticatedResourceListOptions<TItem>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      setItems(await listItems(token));
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  }, [enabled, getToken, listItems, onError]);

  return { items, setItems, loading, loadItems };
}
