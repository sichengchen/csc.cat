type Language =
  | "cat"
  | "en"
  | "fr"
  | "es"
  | "ja"
  | "zh-cn"
  | "zh-tw"
  | "de"
  | "it"
  | "pt"
  | "ko"
  | "wuu"
  | "hak"
  | "lzh"
  | "yue"
  | "nan";

export const languages: { code: Language; label: string }[] = [
  { code: "cat", label: "Català" },
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ko", label: "한국어" },
  { code: "wuu", label: "吴语" },
  { code: "hak", label: "客家話" },
  { code: "lzh", label: "文言" },
  { code: "ja", label: "日本語" },
  { code: "zh-cn", label: "简体中文" },
  { code: "yue", label: "粵語" },
  { code: "zh-tw", label: "繁體中文" },
  { code: "nan", label: "閩南語" },
];

export const htmlLanguages: Record<Language, string> = {
  cat: "ca",
  en: "en",
  fr: "fr",
  es: "es",
  ja: "ja",
  "zh-cn": "zh-Hans",
  "zh-tw": "zh-Hant",
  de: "de",
  it: "it",
  pt: "pt",
  ko: "ko",
  wuu: "wuu",
  hak: "hak",
  lzh: "lzh",
  yue: "yue",
  nan: "nan",
};

function isLanguage(value: string | null): value is Language {
  return languages.some((option) => option.code === value);
}

function getBrowserLanguage(): Language {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const locale of browserLanguages) {
    const language = matchSupportedLanguage(locale);

    if (language) {
      return language;
    }
  }

  return "en";
}

function matchSupportedLanguage(locale: string | undefined): Language | null {
  const language = locale?.toLowerCase();

  if (!language) {
    return null;
  }

  if (language.startsWith("ca")) {
    return "cat";
  }

  if (language.startsWith("de")) {
    return "de";
  }

  if (language.startsWith("en")) {
    return "en";
  }

  if (language.startsWith("es")) {
    return "es";
  }

  if (language.startsWith("fr")) {
    return "fr";
  }

  if (language.startsWith("it")) {
    return "it";
  }

  if (language.startsWith("pt")) {
    return "pt";
  }

  if (language.startsWith("ko")) {
    return "ko";
  }

  if (language.startsWith("wuu")) {
    return "wuu";
  }

  if (
    language.startsWith("hak") ||
    language.startsWith("zh-hakka") ||
    language.startsWith("i-hak")
  ) {
    return "hak";
  }

  if (language.startsWith("lzh")) {
    return "lzh";
  }

  if (language.startsWith("ja")) {
    return "ja";
  }

  if (language.startsWith("yue")) {
    return "yue";
  }

  if (language.startsWith("nan") || language.startsWith("zh-min-nan")) {
    return "nan";
  }

  if (
    language.startsWith("zh-tw") ||
    language.startsWith("zh-hant") ||
    language.startsWith("zh-hk") ||
    language.startsWith("zh-mo")
  ) {
    return "zh-tw";
  }

  if (language.startsWith("zh")) {
    return "zh-cn";
  }

  return null;
}

export function getInitialLanguage(): Language {
  const saved = window.localStorage.getItem("catalog-language");

  if (isLanguage(saved)) {
    return saved;
  }

  if (saved === "ca") {
    return "cat";
  }

  return getBrowserLanguage();
}

export type { Language };
