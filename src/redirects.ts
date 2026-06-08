const linkRedirects = {
  homepage: "https://scchan.com",
  system: "https://scchan.com/system",
  blog: "https://blog.scchan.com",
  apps: "https://www.scchan.moe/apps",
  github: "https://github.com/sichengchen",
  instagram: "https://www.instagram.com/chensc03/",
  rednote: "https://www.xiaohongshu.com/user/profile/60e10be2000000000101c20e",
  bluesky: "https://bsky.app/profile/scchan.com",
  x: "https://x.com/syzen_zen",
  linkedin: "https://www.linkedin.com/in/sichengchen/",
} as const;

const extraRedirects = {
  watched: "https://blog.scchan.com/watched",
} as const;

export const redirects = {
  ...linkRedirects,
  ...extraRedirects,
} as const;

export type LinkId = keyof typeof linkRedirects;
export type RedirectId = keyof typeof redirects;

export function redirectPath(id: LinkId): string {
  return `/${id}`;
}
