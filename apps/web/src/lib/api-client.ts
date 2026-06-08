import type { ApiErrorCode } from "@csc/shared";

export class ApiClientError extends Error {
  code: ApiErrorCode;
  status: number;

  constructor(code: ApiErrorCode, status = 400) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

type JsonRequestOptions = RequestInit & {
  token?: string | null;
};

function fallbackCodeForStatus(status: number): ApiErrorCode {
  if (status === 401) {
    return "unauthorized";
  }
  if (status === 403) {
    return "forbidden";
  }
  if (status === 404 || status === 410) {
    return "not_found";
  }
  return "validation_error";
}

async function parseErrorCode(response: Response): Promise<ApiErrorCode> {
  try {
    const body = (await response.json()) as { error?: ApiErrorCode };
    return body.error ?? fallbackCodeForStatus(response.status);
  } catch {
    return fallbackCodeForStatus(response.status);
  }
}

export async function requestJson<T>(path: string, options: JsonRequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiClientError(await parseErrorCode(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
