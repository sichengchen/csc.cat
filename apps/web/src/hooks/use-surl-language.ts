import { useEffect, useState } from "react";
import { copy, htmlLanguages, type SurlLanguage } from "@/lib/surl-i18n";

function isSurlLanguage(value: string | null): value is SurlLanguage {
  return value === "en" || value === "cat";
}

function getInitialLanguage(): SurlLanguage {
  const saved = window.localStorage.getItem("surl-language");
  if (isSurlLanguage(saved)) {
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

export function useSurlLanguage() {
  const [language, setLanguage] = useState<SurlLanguage>(getInitialLanguage);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = htmlLanguages[language];
    document.title = t.meta.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", t.meta.description);
    window.localStorage.setItem("surl-language", language);
  }, [language, t.meta.description, t.meta.title]);

  return { language, setLanguage, t };
}
