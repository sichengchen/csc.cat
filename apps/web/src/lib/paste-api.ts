import type {
  ApiErrorCode,
  CreatePasteInput,
  PasteListItem,
  PastePublicItem,
  SlugAvailability,
} from "@csc/shared";
import { ApiClientError, requestJson } from "./api-client";

export class PasteApiError extends ApiClientError {
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
      throw new PasteApiError(error.code, error.status);
    }
    throw error;
  }
}

export async function listPastes(token: string | null): Promise<PasteListItem[]> {
  const data = await request<{ pastes: PasteListItem[] }>("/api/paste", {
    method: "GET",
    token,
  });
  return data.pastes;
}

export async function createPaste(
  token: string | null,
  input: CreatePasteInput,
): Promise<PasteListItem> {
  const data = await request<{ paste: PasteListItem }>("/api/paste", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
  return data.paste;
}

export async function suggestPasteSlug(token: string | null): Promise<string> {
  const data = await request<{ slug: string }>("/api/paste/suggest-slug", {
    method: "GET",
    token,
  });
  return data.slug;
}

export async function checkPasteSlugAvailability(
  token: string | null,
  slug: string,
): Promise<SlugAvailability> {
  return request<SlugAvailability>(`/api/paste/check/${encodeURIComponent(slug)}`, {
    method: "GET",
    token,
  });
}

export async function deletePaste(token: string | null, slug: string): Promise<void> {
  await request<{ ok: boolean }>(`/api/paste/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    token,
  });
}

export async function fetchPublicPaste(slug: string): Promise<PastePublicItem> {
  const data = await request<{ paste: PastePublicItem }>(`/api/paste/${encodeURIComponent(slug)}`, {
    method: "GET",
  });
  return data.paste;
}

export const defaultPasteExpiry = "1mo" as const;
