export function formatExpiry(
  expiresAt: number | null,
  expired: boolean,
  labels: { never: string; expired: string },
): string {
  if (expiresAt === null) {
    return labels.never;
  }
  if (expired) {
    return labels.expired;
  }
  return new Date(expiresAt).toLocaleString();
}
