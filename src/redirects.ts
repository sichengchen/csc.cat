export const redirects = {
  homepage: "https://scchan.com",
  system: "https://scchan.com/system",
  apps: "https://www.scchan.moe/apps",
  blog: "https://blog.scchan.com",
  github: "https://github.com/sichengchen",
  instagram: "https://www.instagram.com/chensc03/",
  rednote: "https://www.xiaohongshu.com/user/profile/60e10be2000000000101c20e",
  bluesky: "https://bsky.app/profile/scchan.com",
  x: "https://x.com/syzen_zen",
  linkedin: "https://www.linkedin.com/in/sichengchen/",
} as const;

export type RedirectId = keyof typeof redirects;

export function redirectPath(id: RedirectId): string {
  return `/${id}`;
}
