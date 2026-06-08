import { ChevronDown, Grip, NotepadText } from "lucide-react";
import {
  SiBluesky,
  SiGithub,
  SiInstagram,
  SiX,
  SiXiaohongshu,
} from "@icons-pack/react-simple-icons";
import type { CSSProperties, ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { redirectPath, type LinkId } from "@csc/shared/redirects";

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

type LinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

type LinkItem = {
  id: LinkId;
  icon: LinkIcon;
};

const links: LinkItem[] = [
  { id: "homepage", icon: FaviconIcon },
  { id: "system", icon: HappyMacIcon },
  { id: "blog", icon: NotepadText },
  { id: "apps", icon: Grip },
  { id: "github", icon: SiGithub },
  { id: "instagram", icon: SiInstagram },
  { id: "rednote", icon: SiXiaohongshu },
  { id: "bluesky", icon: SiBluesky },
  { id: "x", icon: SiX },
  { id: "linkedin", icon: LinkedinIcon },
];

const languages: { code: Language; label: string }[] = [
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

const htmlLanguages: Record<Language, string> = {
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

const englishCopyright = "© 2026 Sicheng Chen. All rights reserved.";

const desktopBackgroundImages = Array.from(
  { length: 9 },
  (_, index) => `https://static.scchan.moe/homepage/homepage-halftone/horizontal/h${index + 1}.png`,
);

const copy = {
  en: {
    meta: {
      title: "Sicheng Chen | Links",
      description: "Sicheng Chen | Links",
    },
    language: "Language",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "Homepage",
        description: "Sicheng's homepage",
      },
      system: {
        title: "System (Homepage)",
        description: "Try this!",
      },
      apps: {
        title: "Apps",
        description: "My apps",
      },
      blog: {
        title: "Blog",
        description: "Posts, photos, and films I recently watched",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  cat: {
    meta: {
      title: "Sicheng Chen | Enllaços",
      description: "Sicheng Chen | Enllaços",
    },
    language: "Idioma",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "Pàgina d'inici",
        description: "La pàgina d'inici de Sicheng",
      },
      system: {
        title: "System (Pàgina d'inici)",
        description: "Prova-ho!",
      },
      apps: {
        title: "Apps",
        description: "Les meves apps",
      },
      blog: {
        title: "Blog",
        description: "Articles, fotos i pel·lícules que he vist recentment",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: "© 2026 Sicheng Chen. Tots els drets reservats.",
  },
  fr: {
    meta: {
      title: "Sicheng Chen | Liens",
      description: "Sicheng Chen | Liens",
    },
    language: "Langue",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "Page d'accueil",
        description: "La page d'accueil de Sicheng",
      },
      system: {
        title: "System (Page d'accueil)",
        description: "Essayez-le!",
      },
      apps: {
        title: "Applications",
        description: "Mes applications",
      },
      blog: {
        title: "Blog",
        description: "Articles, photos et films récemment regardés",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: "© 2026 Sicheng Chen. Tous droits réservés.",
  },
  es: {
    meta: {
      title: "Sicheng Chen | Enlaces",
      description: "Sicheng Chen | Enlaces",
    },
    language: "Idioma",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "Página de inicio",
        description: "La página de inicio de Sicheng",
      },
      system: {
        title: "System (Página de inicio)",
        description: "¡Pruébalo!",
      },
      apps: {
        title: "Aplicaciones",
        description: "Mis aplicaciones",
      },
      blog: {
        title: "Blog",
        description: "Publicaciones, fotos y películas que vi recientemente",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: "© 2026 Sicheng Chen. Todos los derechos reservados.",
  },
  ja: {
    meta: {
      title: "Sicheng Chen | リンク",
      description: "Sicheng Chen | リンク",
    },
    language: "言語",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "ホームページ",
        description: "Sicheng のホームページ",
      },
      system: {
        title: "System (ホームページ)",
        description: "試してみて!",
      },
      apps: {
        title: "アプリ",
        description: "Sicheng のアプリ",
      },
      blog: {
        title: "ブログ",
        description: "記事、写真、最近観た映画",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  "zh-cn": {
    meta: {
      title: "Sicheng Chen | 链接",
      description: "Sicheng Chen | 链接",
    },
    language: "语言",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "主页",
        description: "Sicheng 的主页",
      },
      system: {
        title: "System (主页)",
        description: "试试看!",
      },
      apps: {
        title: "应用",
        description: "我的应用",
      },
      blog: {
        title: "博客",
        description: "文章、照片和最近看的电影",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "小红书",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  "zh-tw": {
    meta: {
      title: "Sicheng Chen | 連結",
      description: "Sicheng Chen | 連結",
    },
    language: "語言",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "首頁",
        description: "Sicheng 的首頁",
      },
      system: {
        title: "System (首頁)",
        description: "試試看!",
      },
      apps: {
        title: "應用程式",
        description: "我的應用程式",
      },
      blog: {
        title: "部落格",
        description: "文章、照片和最近看的電影",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "小紅書",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  de: {
    meta: {
      title: "Sicheng Chen | Links",
      description: "Sicheng Chen | Links",
    },
    language: "Sprache",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "Homepage",
        description: "Sichengs Homepage",
      },
      system: {
        title: "System (Homepage)",
        description: "Probier es aus!",
      },
      apps: {
        title: "Apps",
        description: "Meine Apps",
      },
      blog: {
        title: "Blog",
        description: "Beiträge, Fotos und kürzlich gesehene Filme",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: "© 2026 Sicheng Chen. Alle Rechte vorbehalten.",
  },
  it: {
    meta: {
      title: "Sicheng Chen | Link",
      description: "Sicheng Chen | Link",
    },
    language: "Lingua",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "Homepage",
        description: "La homepage di Sicheng",
      },
      system: {
        title: "System (Homepage)",
        description: "Provalo!",
      },
      apps: {
        title: "App",
        description: "Le mie app",
      },
      blog: {
        title: "Blog",
        description: "Articoli, foto e film visti di recente",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: "© 2026 Sicheng Chen. Tutti i diritti riservati.",
  },
  pt: {
    meta: {
      title: "Sicheng Chen | Links",
      description: "Sicheng Chen | Links",
    },
    language: "Idioma",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "Página inicial",
        description: "A página inicial de Sicheng",
      },
      system: {
        title: "System (Página inicial)",
        description: "Experimente!",
      },
      apps: {
        title: "Apps",
        description: "Meus apps",
      },
      blog: {
        title: "Blog",
        description: "Publicações, fotos e filmes que assisti recentemente",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: "© 2026 Sicheng Chen. Todos os direitos reservados.",
  },
  ko: {
    meta: {
      title: "Sicheng Chen | 링크",
      description: "Sicheng Chen | 링크",
    },
    language: "언어",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "홈페이지",
        description: "Sicheng의 홈페이지",
      },
      system: {
        title: "System (홈페이지)",
        description: "사용해 보세요!",
      },
      apps: {
        title: "앱",
        description: "Sicheng의 앱",
      },
      blog: {
        title: "블로그",
        description: "글, 사진, 최근에 본 영화",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "RedNote",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  wuu: {
    meta: {
      title: "Sicheng Chen | 链接",
      description: "Sicheng Chen | 链接",
    },
    language: "闲话",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "主页",
        description: "Sicheng 个主页",
      },
      system: {
        title: "System (主页)",
        description: "试试看!",
      },
      apps: {
        title: "应用",
        description: "我个应用",
      },
      blog: {
        title: "博客",
        description: "文章、照片搭最近看个电影",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "小红书",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  hak: {
    meta: {
      title: "Sicheng Chen | 連結",
      description: "Sicheng Chen | 連結",
    },
    language: "語言",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "首頁",
        description: "Sicheng 个首頁",
      },
      system: {
        title: "System (首頁)",
        description: "試看啊!",
      },
      apps: {
        title: "應用程式",
        description: "我个應用程式",
      },
      blog: {
        title: "部落格",
        description: "文章、照片同最近看个電影",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "小紅書",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  lzh: {
    meta: {
      title: "Sicheng Chen | 鏈接",
      description: "Sicheng Chen | 鏈接",
    },
    language: "語言",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "首頁",
        description: "Sicheng 之首頁",
      },
      system: {
        title: "System (首頁)",
        description: "試之!",
      },
      apps: {
        title: "應用",
        description: "吾之應用",
      },
      blog: {
        title: "博客",
        description: "文章、圖片與近日所觀之影戲",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "小紅書",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  yue: {
    meta: {
      title: "Sicheng Chen | 連結",
      description: "Sicheng Chen | 連結",
    },
    language: "語言",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "主頁",
        description: "Sicheng 嘅主頁",
      },
      system: {
        title: "System (主頁)",
        description: "試下啦!",
      },
      apps: {
        title: "應用程式",
        description: "我嘅應用程式",
      },
      blog: {
        title: "網誌",
        description: "文章、相片同最近睇過嘅電影",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "小紅書",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
  nan: {
    meta: {
      title: "Sicheng Chen | 鏈結",
      description: "Sicheng Chen | 鏈結",
    },
    language: "語言",
    profile: {
      name: "Sicheng Chen",
    },
    links: {
      homepage: {
        title: "首頁",
        description: "Sicheng ê 首頁",
      },
      system: {
        title: "System (首頁)",
        description: "試看覓!",
      },
      apps: {
        title: "Apps",
        description: "我 ê apps",
      },
      blog: {
        title: "部落格",
        description: "文章、相片 kah 最近看過 ê 電影",
      },
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
      },
      rednote: {
        title: "小紅書",
        description: "@scchan",
      },
      bluesky: {
        title: "Bluesky",
        description: "@scchan.com",
      },
      x: {
        title: "X (Twitter)",
        description: "@syzen_zen",
      },
      linkedin: {
        title: "LinkedIn",
        description: "@sichengchen",
      },
    },
    copyright: englishCopyright,
  },
} as const;

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

function getInitialLanguage(): Language {
  const saved = window.localStorage.getItem("catalog-language");

  if (isLanguage(saved)) {
    return saved;
  }

  if (saved === "ca") {
    return "cat";
  }

  return getBrowserLanguage();
}

export function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [desktopBackgroundImage] = useState(
    () => desktopBackgroundImages[Math.floor(Math.random() * desktopBackgroundImages.length)],
  );
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = htmlLanguages[language];
    document.title = t.meta.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", t.meta.description);
    window.localStorage.setItem("catalog-language", language);
  }, [language, t.meta.description, t.meta.title]);

  return (
    <main
      className="min-h-svh bg-background px-4 py-6 text-foreground sm:grid sm:place-items-center sm:bg-(image:--desktop-background-image) sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-soft-light sm:py-8"
      style={
        {
          "--desktop-background-image": `url(${desktopBackgroundImage})`,
          backgroundColor: "oklch(1 0 0 / 82%)",
        } as CSSProperties
      }
    >
      <Card className="w-full max-w-md rounded-none bg-transparent shadow-none ring-0 sm:rounded-xl sm:bg-card sm:shadow-lg sm:ring-1">
        <CardHeader className="px-0 sm:px-4">
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label={t.language} size="sm" type="button" variant="outline">
                  {languages.find((option) => option.code === language)?.label}
                  <ChevronDown aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  onValueChange={(value) => setLanguage(value as Language)}
                  value={language}
                >
                  {languages.map((option) => (
                    <DropdownMenuRadioItem key={option.code} value={option.code}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-0 sm:px-4">
          <div className="flex flex-col items-center text-center">
            <CardTitle className="font-display text-5xl leading-none">{t.profile.name}</CardTitle>
          </div>

          <Separator />

          <div className="space-y-3">
            {links.map((link) => {
              const Icon = link.icon;
              const linkCopy = t.links[link.id];

              return (
                <Button
                  asChild
                  className="h-auto min-h-18 w-full justify-start whitespace-normal p-0 text-left leading-normal"
                  key={link.id}
                  size="lg"
                  variant="outline"
                >
                  <a href={redirectPath(link.id)}>
                    <span className="flex w-full items-start gap-3 p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center text-foreground">
                        <Icon aria-hidden="true" className="size-6" focusable="false" />
                      </span>
                      <span className="min-w-0 flex-1 space-y-0">
                        <span className="block text-sm leading-snug font-medium">
                          {linkCopy.title}
                        </span>
                        <span className="block text-sm leading-snug text-muted-foreground">
                          {linkCopy.description}
                        </span>
                      </span>
                    </span>
                  </a>
                </Button>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="justify-center border-t-0 bg-transparent px-0 sm:border-t sm:bg-muted/50 sm:p-4">
          <CardDescription className="text-center text-xs">{t.copyright}</CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
}

function HappyMacIcon({ "aria-hidden": ariaHidden, className }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden={ariaHidden} className={className} fill="currentColor" viewBox="0 0 32 32">
      <rect x="11.5" y="7" width="1" height="2" />
      <rect x="3.5" y="2" width="1" height="25" />
      <rect x="5.5" width="21" height="1" />
      <rect x="18.5" y="22" width="6" height="1" />
      <rect x="4.5" y="1" width="1" height="1" />
      <rect x="26.5" y="1" width="1" height="1" />
      <rect x="27.5" y="2" width="1" height="25" />
      <path d="M4.5,27v5h23v-5H4.5ZM26.5,31H5.5v-3h21v3Z" />
      <rect x="6.5" y="23" width="2" height="1" />
      <rect x="19.5" y="7" width="1" height="2" />
      <rect x="18.5" y="13" width="1" height="1" />
      <rect x="13.5" y="13" width="1" height="1" />
      <rect x="14.5" y="14" width="4" height="1" />
      <rect x="7.5" y="3" width="17" height="1" />
      <rect x="6.5" y="4" width="1" height="13" />
      <rect x="24.5" y="4" width="1" height="13" />
      <rect x="7.5" y="17" width="17" height="1" />
      <polygon points="16 7 16 11 15 11 15 12 16 12 17 12 17 7 16 7" />
    </svg>
  );
}

function FaviconIcon({ "aria-hidden": ariaHidden, className }: SVGProps<SVGSVGElement>) {
  return (
    <img
      aria-hidden={ariaHidden}
      alt=""
      className={className}
      decoding="async"
      src="/favicon.svg"
    />
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.53V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}
