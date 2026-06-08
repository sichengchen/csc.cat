export const EXPIRY_PRESETS = ["1d", "7d", "14d", "1mo", "3mo", "6mo", "1year", "forever"] as const;

export type ExpiryPreset = (typeof EXPIRY_PRESETS)[number];

export const EXPIRY_DURATIONS_MS: Record<Exclude<ExpiryPreset, "forever">, number> = {
  "1d": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "14d": 14 * 24 * 60 * 60 * 1000,
  "1mo": 30 * 24 * 60 * 60 * 1000,
  "3mo": 90 * 24 * 60 * 60 * 1000,
  "6mo": 180 * 24 * 60 * 60 * 1000,
  "1year": 365 * 24 * 60 * 60 * 1000,
};

export function computeExpiresAt(createdAt: number, expiry: ExpiryPreset): number | null {
  if (expiry === "forever") {
    return null;
  }
  return createdAt + EXPIRY_DURATIONS_MS[expiry];
}

export function isExpired(record: { expiresAt: number | null }, now = Date.now()): boolean {
  return record.expiresAt !== null && record.expiresAt <= now;
}
