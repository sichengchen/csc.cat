import { useEffect, useState } from "react";
import { copy, htmlLanguages, type PasteUiLanguage } from "@/lib/paste-i18n";

function isPasteUiLanguage(value: string | null): value is PasteUiLanguage {
  return value === "en" || value === "cat";
}

function getInitialLanguage(): PasteUiLanguage {
  const saved = window.localStorage.getItem("paste-language");
  if (isPasteUiLanguage(saved)) {
    return saved;
  }

  const catalog = window.localStorage.getItem("catalog-language");
  if (catalog === "cat" || catalog === "ca") {
    return "cat";
  }

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const locale of browserLanguages) {
    if (locale.toLowerCase().startsWith("ca")) {
      return "cat";
    }
  }

  return "en";
}

export function usePasteLanguage() {
  const [language, setLanguage] = useState<PasteUiLanguage>(getInitialLanguage);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = htmlLanguages[language];
    document.title = t.meta.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", t.meta.description);
    window.localStorage.setItem("paste-language", language);
  }, [language, t.meta.description, t.meta.title]);

  return { language, setLanguage, t };
}
