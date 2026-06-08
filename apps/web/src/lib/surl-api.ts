import type {
  ApiErrorCode,
  CreateSurlInput,
  ExpiryPreset,
  SlugAvailability,
  SurlListItem,
} from "@csc/shared";
import { ApiClientError, requestJson } from "./api-client";

export class SurlApiError extends ApiClientError {
  constructor(code: ApiErrorCode, status = 400) {
    super(code, status);
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
): Promise<T> {
  try {
    return await requestJson<T>(path, options);
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw new SurlApiError(error.code, error.status);
    }
    throw error;
  }
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
