import redirectData from "./redirects.json";

const linkRedirectKeys = [
  "homepage",
  "system",
  "blog",
  "apps",
  "github",
  "instagram",
  "rednote",
  "bluesky",
  "x",
  "linkedin",
] as const;

export type LinkId = (typeof linkRedirectKeys)[number];
export type RedirectId = keyof typeof redirectData;

const linkRedirects = Object.fromEntries(
  linkRedirectKeys.map((id) => [id, redirectData[id]]),
) as Record<LinkId, string>;

export const redirects = redirectData;

export const RESERVED_SLUGS = new Set<string>(Object.keys(redirects));

export function redirectPath(id: LinkId): string {
  return `/${id}`;
}

export { linkRedirects };
