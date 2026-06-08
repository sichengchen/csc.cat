import { z } from "zod";
import { RESERVED_SLUGS } from "./redirects";
import { EXPIRY_PRESETS } from "./expiry";
import { SLUG_PATTERN } from "./slug";

export { computeExpiresAt, EXPIRY_PRESETS, isExpired, type ExpiryPreset } from "./expiry";
export {
  generateRandomSlug,
  getSlugValidationError,
  SLUG_PATTERN,
  type SlugAvailability,
} from "./slug";
export type { ApiErrorCode } from "./api-errors";

export const PASTE_LANGUAGES = [
  "plain",
  "bash",
  "c",
  "cpp",
  "csharp",
  "css",
  "go",
  "html",
  "java",
  "javascript",
  "json",
  "kotlin",
  "markdown",
  "php",
  "python",
  "ruby",
  "rust",
  "sql",
  "swift",
  "typescript",
  "yaml",
] as const;

export type PasteLanguage = (typeof PASTE_LANGUAGES)[number];

const PASTE_LANGUAGE_LABELS: Record<PasteLanguage, string> = {
  plain: "Plain text",
  bash: "Bash",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  css: "CSS",
  go: "Go",
  html: "HTML",
  java: "Java",
  javascript: "JavaScript",
  json: "JSON",
  kotlin: "Kotlin",
  markdown: "Markdown",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  rust: "Rust",
  sql: "SQL",
  swift: "Swift",
  typescript: "TypeScript",
  yaml: "YAML",
};

export function pasteLanguageLabel(language: PasteLanguage): string {
  return PASTE_LANGUAGE_LABELS[language];
}

export const MAX_PASTE_CONTENT_LENGTH = 512_000;

export const createPasteSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(32)
    .regex(SLUG_PATTERN, "invalid_slug")
    .refine((slug) => !RESERVED_SLUGS.has(slug), "slug_reserved"),
  content: z.string().min(1).max(MAX_PASTE_CONTENT_LENGTH),
  language: z.enum(PASTE_LANGUAGES),
  expiry: z.enum(EXPIRY_PRESETS),
});

export type CreatePasteInput = z.infer<typeof createPasteSchema>;

export const pasteRecordSchema = z.object({
  slug: z.string(),
  content: z.string(),
  language: z.enum(PASTE_LANGUAGES),
  userId: z.string(),
  createdAt: z.number(),
  expiresAt: z.number().nullable(),
});

export type PasteRecord = z.infer<typeof pasteRecordSchema>;

export type PasteListItem = {
  slug: string;
  contentPreview: string;
  language: PasteLanguage;
  createdAt: number;
  expiresAt: number | null;
  pasteUrl: string;
  expired: boolean;
};

export type PastePublicItem = {
  slug: string;
  content: string;
  language: PasteLanguage;
  createdAt: number;
  expiresAt: number | null;
};

export function buildContentPreview(content: string, maxLength = 120): string {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, maxLength)}…`;
}
