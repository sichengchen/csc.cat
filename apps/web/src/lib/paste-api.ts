import type {
  ApiErrorCode,
  CreatePasteInput,
  PasteListItem,
  PastePublicItem,
  SlugAvailability,
} from "@csc/shared";

export class PasteApiError extends Error {
  code: ApiErrorCode;
  status: number;

  constructor(code: ApiErrorCode, status = 400) {
    super(code);
    this.code = code;
    this.status = status;
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
      } else if (response.status === 404 || response.status === 410) {
        code = "not_found";
      }
    }
    throw new PasteApiError(code, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
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
  const response = await fetch(`/api/paste/${encodeURIComponent(slug)}`, {
    method: "GET",
  });

  if (!response.ok) {
    let code: ApiErrorCode = "validation_error";
    try {
      const body = (await response.json()) as { error?: ApiErrorCode };
      if (body.error) {
        code = body.error;
      }
    } catch {
      if (response.status === 404 || response.status === 410) {
        code = "not_found";
      }
    }
    throw new PasteApiError(code, response.status);
  }

  const data = (await response.json()) as { paste: PastePublicItem };
  return data.paste;
}

export const defaultPasteExpiry = "1mo" as const;
