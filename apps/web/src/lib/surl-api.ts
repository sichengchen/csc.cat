import type {
  ApiErrorCode,
  CreateSurlInput,
  ExpiryPreset,
  SlugAvailability,
  SurlListItem,
} from "@csc/shared";

export class SurlApiError extends Error {
  code: ApiErrorCode;

  constructor(code: ApiErrorCode) {
    super(code);
    this.code = code;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let code: ApiErrorCode = "validation_error";
    try {
      const body = (await response.json()) as { error?: ApiErrorCode };
      if (body.error) {
        code = body.error;
      }
    } catch {
      if (response.status === 401) {
        code = "unauthorized";
      }
    }
    throw new SurlApiError(code);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function listLinks(token: string | null): Promise<SurlListItem[]> {
  const data = await request<{ links: SurlListItem[] }>("/api/surl", {
    method: "GET",
    token,
  });
  return data.links;
}

export async function createLink(
  token: string | null,
  input: CreateSurlInput,
): Promise<SurlListItem> {
  const data = await request<{ link: SurlListItem }>("/api/surl", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
  return data.link;
}

export async function suggestSlug(token: string | null): Promise<string> {
  const data = await request<{ slug: string }>("/api/surl/suggest-slug", {
    method: "GET",
    token,
  });
  return data.slug;
}

export async function checkSlugAvailability(
  token: string | null,
  slug: string,
): Promise<SlugAvailability> {
  return request<SlugAvailability>(`/api/surl/check/${encodeURIComponent(slug)}`, {
    method: "GET",
    token,
  });
}

export async function deleteLink(token: string | null, slug: string): Promise<void> {
  await request<{ ok: boolean }>(`/api/surl/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

export const defaultExpiry: ExpiryPreset = "1mo";
