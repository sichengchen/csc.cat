const englishCopyright = "© 2026 Sicheng Chen. All rights reserved.";

const socialLinks = {
  github: {
    title: "GitHub",
    description: "@sichengchen",
  },
  instagram: {
    title: "Instagram",
    description: "@sichengch",
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
} as const;

// Keep the catalog title in English unless its translation starts with "cat".

export const copy = {
  en: {
    meta: {
      title: "Sicheng Chen | Links",
      description: "Sicheng Chen | Links",
    },
    language: "Language",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
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
      ...socialLinks,
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
      catalog: "Catàleg",
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
        description: "@sichengch",
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
      catalog: "Catalogue",
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
        description: "@sichengch",
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
      catalog: "Catálogo",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalogo",
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
        description: "@sichengch",
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
      catalog: "Catálogo",
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
        description: "@sichengch",
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
  nl: {
    meta: {
      title: "Sicheng Chen | Links",
      description: "Sicheng Chen | Links",
    },
    language: "Taal",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalogus",
    },
    links: {
      homepage: {
        title: "Startpagina",
        description: "De startpagina van Sicheng",
      },
      system: {
        title: "System (startpagina)",
        description: "Probeer het eens!",
      },
      apps: {
        title: "Apps",
        description: "Mijn apps",
      },
      blog: {
        title: "Blog",
        description: "Berichten, foto's en films die ik onlangs heb gezien",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Alle rechten voorbehouden.",
  },
  sv: {
    meta: {
      title: "Sicheng Chen | Länkar",
      description: "Sicheng Chen | Länkar",
    },
    language: "Språk",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Startsida",
        description: "Sichengs startsida",
      },
      system: {
        title: "System (startsida)",
        description: "Prova själv!",
      },
      apps: {
        title: "Appar",
        description: "Mina appar",
      },
      blog: {
        title: "Blogg",
        description: "Inlägg, foton och filmer jag nyligen har sett",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Alla rättigheter förbehållna.",
  },
  nb: {
    meta: {
      title: "Sicheng Chen | Lenker",
      description: "Sicheng Chen | Lenker",
    },
    language: "Språk",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Hjemmeside",
        description: "Sichengs hjemmeside",
      },
      system: {
        title: "System (hjemmeside)",
        description: "Prøv det selv!",
      },
      apps: {
        title: "Apper",
        description: "Appene mine",
      },
      blog: {
        title: "Blogg",
        description: "Innlegg, bilder og filmer jeg nylig har sett",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Med enerett.",
  },
  fi: {
    meta: {
      title: "Sicheng Chen | Linkit",
      description: "Sicheng Chen | Linkit",
    },
    language: "Kieli",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Kotisivu",
        description: "Sichengin kotisivu",
      },
      system: {
        title: "System (kotisivu)",
        description: "Kokeile tätä!",
      },
      apps: {
        title: "Sovellukset",
        description: "Sovellukseni",
      },
      blog: {
        title: "Blogi",
        description: "Kirjoituksia, valokuvia ja viime aikoina katsomiani elokuvia",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Kaikki oikeudet pidätetään.",
  },
  is: {
    meta: {
      title: "Sicheng Chen | Tenglar",
      description: "Sicheng Chen | Tenglar",
    },
    language: "Tungumál",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Heimasíða",
        description: "Heimasíða Sicheng",
      },
      system: {
        title: "System (heimasíða)",
        description: "Prófaðu þetta!",
      },
      apps: {
        title: "Forrit",
        description: "Forritin mín",
      },
      blog: {
        title: "Blogg",
        description: "Færslur, ljósmyndir og kvikmyndir sem ég hef séð nýlega",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Öll réttindi áskilin.",
  },
  ga: {
    meta: {
      title: "Sicheng Chen | Naisc",
      description: "Sicheng Chen | Naisc",
    },
    language: "Teanga",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalóg",
    },
    links: {
      homepage: {
        title: "Leathanach baile",
        description: "Leathanach baile Sicheng",
      },
      system: {
        title: "System (leathanach baile)",
        description: "Bain triail as seo!",
      },
      apps: {
        title: "Aipeanna",
        description: "Mo chuid aipeanna",
      },
      blog: {
        title: "Blag",
        description: "Postálacha, grianghraif agus scannáin a chonaic mé le déanaí",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Gach ceart ar cosaint.",
  },
  cs: {
    meta: {
      title: "Sicheng Chen | Odkazy",
      description: "Sicheng Chen | Odkazy",
    },
    language: "Jazyk",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Domovská stránka",
        description: "Domovská stránka Sichenga",
      },
      system: {
        title: "System (domovská stránka)",
        description: "Vyzkoušejte to!",
      },
      apps: {
        title: "Aplikace",
        description: "Moje aplikace",
      },
      blog: {
        title: "Blog",
        description: "Příspěvky, fotky a filmy, které jsem nedávno viděl",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Všechna práva vyhrazena.",
  },
  pl: {
    meta: {
      title: "Sicheng Chen | Linki",
      description: "Sicheng Chen | Linki",
    },
    language: "Język",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Strona główna",
        description: "Strona główna Sichenga",
      },
      system: {
        title: "System (strona główna)",
        description: "Wypróbuj!",
      },
      apps: {
        title: "Aplikacje",
        description: "Moje aplikacje",
      },
      blog: {
        title: "Blog",
        description: "Wpisy, zdjęcia i filmy, które ostatnio oglądałem",
      },
      ...socialLinks,
    },
    copyright: "© 2026 Sicheng Chen. Wszelkie prawa zastrzeżone.",
  },
  el: {
    meta: {
      title: "Sicheng Chen | Σύνδεσμοι",
      description: "Sicheng Chen | Σύνδεσμοι",
    },
    language: "Γλώσσα",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Αρχική σελίδα",
        description: "Η αρχική σελίδα του Sicheng",
      },
      system: {
        title: "System (αρχική σελίδα)",
        description: "Δοκίμασέ το!",
      },
      apps: {
        title: "Εφαρμογές",
        description: "Οι εφαρμογές μου",
      },
      blog: {
        title: "Ιστολόγιο",
        description: "Αναρτήσεις, φωτογραφίες και ταινίες που είδα πρόσφατα",
      },
      ...socialLinks,
    },
    copyright: englishCopyright,
  },
  ru: {
    meta: {
      title: "Sicheng Chen | Ссылки",
      description: "Sicheng Chen | Ссылки",
    },
    language: "Язык",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Главная страница",
        description: "Главная страница Sicheng Chen",
      },
      system: {
        title: "System (главная страница)",
        description: "Попробуйте!",
      },
      apps: {
        title: "Приложения",
        description: "Мои приложения",
      },
      blog: {
        title: "Блог",
        description: "Записи, фотографии и фильмы, которые я недавно посмотрел",
      },
      ...socialLinks,
    },
    copyright: englishCopyright,
  },
  uk: {
    meta: {
      title: "Sicheng Chen | Посилання",
      description: "Sicheng Chen | Посилання",
    },
    language: "Мова",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "Головна сторінка",
        description: "Головна сторінка Sicheng Chen",
      },
      system: {
        title: "System (головна сторінка)",
        description: "Спробуйте!",
      },
      apps: {
        title: "Застосунки",
        description: "Мої застосунки",
      },
      blog: {
        title: "Блог",
        description: "Дописи, світлини й фільми, які я нещодавно переглянув",
      },
      ...socialLinks,
    },
    copyright: englishCopyright,
  },
  ar: {
    meta: {
      title: "الروابط | Sicheng Chen",
      description: "الروابط | Sicheng Chen",
    },
    language: "اللغة",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "الصفحة الرئيسية",
        description: "الصفحة الرئيسية لـ Sicheng Chen",
      },
      system: {
        title: "الصفحة الرئيسية (System)",
        description: "جرّبها!",
      },
      apps: {
        title: "التطبيقات",
        description: "تطبيقاتي",
      },
      blog: {
        title: "المدوّنة",
        description: "تدوينات وصور وأفلام شاهدتها مؤخرًا",
      },
      ...socialLinks,
    },
    copyright: englishCopyright,
  },
  fa: {
    meta: {
      title: "پیوندها | Sicheng Chen",
      description: "پیوندها | Sicheng Chen",
    },
    language: "زبان",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
    },
    links: {
      homepage: {
        title: "صفحهٔ اصلی",
        description: "صفحهٔ اصلی Sicheng Chen",
      },
      system: {
        title: "صفحهٔ اصلی (System)",
        description: "امتحانش کنید!",
      },
      apps: {
        title: "برنامه‌ها",
        description: "برنامه‌های من",
      },
      blog: {
        title: "وبلاگ",
        description: "نوشته‌ها، عکس‌ها و فیلم‌هایی که اخیراً دیده‌ام",
      },
      ...socialLinks,
    },
    copyright: englishCopyright,
  },
  ko: {
    meta: {
      title: "Sicheng Chen | 링크",
      description: "Sicheng Chen | 링크",
    },
    language: "언어",
    profile: {
      name: "Sicheng Chen",
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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
      catalog: "Catalog",
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
        description: "@sichengch",
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

type InAppBrowserNoticeCopy = {
  title: string;
  description: string;
  dismiss: string;
};

export const inAppBrowserNoticeCopy = {
  en: {
    title: "Open in your browser",
    description: 'For the best experience, tap the menu button and choose "Open in Browser."',
    dismiss: "Dismiss notice",
  },
  cat: {
    title: "Obre al navegador",
    description:
      'Per tenir la millor experiència, toca el botó de menú i tria "Obre al navegador".',
    dismiss: "Tanca l'avís",
  },
  fr: {
    title: "Ouvrir dans le navigateur",
    description:
      'Pour une meilleure expérience, touchez le bouton de menu, puis choisissez "Ouvrir dans le navigateur".',
    dismiss: "Fermer l'avis",
  },
  es: {
    title: "Abrir en el navegador",
    description:
      'Para una mejor experiencia, toca el botón de menú y elige "Abrir en el navegador".',
    dismiss: "Cerrar aviso",
  },
  ja: {
    title: "ブラウザで開く",
    description:
      "より快適に使うには、メニューボタンをタップして「ブラウザで開く」を選んでください。",
    dismiss: "通知を閉じる",
  },
  "zh-cn": {
    title: "在浏览器中打开",
    description: "为了获得更好的体验，请点按菜单按钮，然后选择“在浏览器中打开”。",
    dismiss: "关闭提示",
  },
  "zh-tw": {
    title: "在瀏覽器中開啟",
    description: "為了獲得更好的體驗，請點按選單按鈕，然後選擇「在瀏覽器中開啟」。",
    dismiss: "關閉提示",
  },
  de: {
    title: "Im Browser öffnen",
    description: 'Tippe für die beste Erfahrung auf die Menütaste und wähle "Im Browser öffnen".',
    dismiss: "Hinweis schließen",
  },
  it: {
    title: "Apri nel browser",
    description:
      'Per un\'esperienza migliore, tocca il pulsante del menu e scegli "Apri nel browser".',
    dismiss: "Chiudi avviso",
  },
  pt: {
    title: "Abrir no navegador",
    description:
      'Para uma melhor experiência, toque no botão de menu e escolha "Abrir no navegador".',
    dismiss: "Fechar aviso",
  },
  nl: {
    title: "Openen in je browser",
    description: 'Tik voor de beste ervaring op de menuknop en kies "Openen in browser".',
    dismiss: "Melding sluiten",
  },
  sv: {
    title: "Öppna i webbläsaren",
    description: 'Tryck på menyknappen och välj "Öppna i webbläsaren" för bästa upplevelse.',
    dismiss: "Stäng meddelandet",
  },
  nb: {
    title: "Åpne i nettleseren",
    description:
      'Trykk på menyknappen og velg "Åpne i nettleseren" for å få den beste opplevelsen.',
    dismiss: "Lukk varselet",
  },
  fi: {
    title: "Avaa selaimessa",
    description:
      'Saat parhaan käyttökokemuksen napauttamalla valikkopainiketta ja valitsemalla "Avaa selaimessa".',
    dismiss: "Sulje ilmoitus",
  },
  is: {
    title: "Opna í vafra",
    description:
      "Til að fá sem besta upplifun skaltu ýta á valmyndarhnappinn og velja „Opna í vafra“.",
    dismiss: "Loka tilkynningu",
  },
  ga: {
    title: "Oscail sa bhrabhsálaí",
    description:
      'Chun an t-eispéireas is fearr a fháil, tapáil cnaipe an roghchláir agus roghnaigh "Oscail sa bhrabhsálaí".',
    dismiss: "Dún an fógra",
  },
  cs: {
    title: "Otevřít v prohlížeči",
    description:
      "Pro nejlepší zážitek klepněte na tlačítko nabídky a vyberte „Otevřít v prohlížeči“.",
    dismiss: "Zavřít upozornění",
  },
  pl: {
    title: "Otwórz w przeglądarce",
    description:
      "Aby wygodniej korzystać ze strony, stuknij przycisk menu i wybierz „Otwórz w przeglądarce”.",
    dismiss: "Zamknij komunikat",
  },
  el: {
    title: "Άνοιγμα στο πρόγραμμα περιήγησης",
    description:
      "Για καλύτερη εμπειρία, πάτησε το κουμπί μενού και επίλεξε «Άνοιγμα στο πρόγραμμα περιήγησης».",
    dismiss: "Κλείσιμο ειδοποίησης",
  },
  ru: {
    title: "Открыть в браузере",
    description:
      "Чтобы пользоваться сайтом было удобнее, нажмите кнопку меню и выберите «Открыть в браузере».",
    dismiss: "Закрыть уведомление",
  },
  uk: {
    title: "Відкрити в браузері",
    description:
      "Щоб було зручніше користуватися сайтом, натисніть кнопку меню й виберіть «Відкрити в браузері».",
    dismiss: "Закрити сповіщення",
  },
  ar: {
    title: "افتح الصفحة في المتصفح",
    description: "للحصول على أفضل تجربة، اضغط على زر القائمة واختر «فتح في المتصفح».",
    dismiss: "إغلاق التنبيه",
  },
  fa: {
    title: "صفحه را در مرورگر باز کنید",
    description: "برای تجربهٔ بهتر، روی دکمهٔ منو بزنید و «باز کردن در مرورگر» را انتخاب کنید.",
    dismiss: "بستن اعلان",
  },
  ko: {
    title: "브라우저에서 열기",
    description: "더 나은 경험을 위해 메뉴 버튼을 누른 뒤 “브라우저에서 열기”를 선택하세요.",
    dismiss: "알림 닫기",
  },
  wuu: {
    title: "勒浏览器里向打开",
    description: "为着更好个体验，请点菜单按钮，再选“勒浏览器里向打开”。",
    dismiss: "关脱提示",
  },
  hak: {
    title: "在瀏覽器打開",
    description: "為著較好个體驗，請點選單按鈕，然後選「在瀏覽器打開」。",
    dismiss: "關忒提示",
  },
  lzh: {
    title: "以瀏覽器開啟",
    description: "欲得佳驗，請按選單，而擇「以瀏覽器開啟」。",
    dismiss: "關閉提示",
  },
  yue: {
    title: "喺瀏覽器開啟",
    description: "想有更好體驗，請撳選單按鈕，然後揀「喺瀏覽器開啟」。",
    dismiss: "關閉提示",
  },
  nan: {
    title: "佇瀏覽器拍開",
    description: "欲有較好的體驗，請揤選單鈕，閣揀「佇瀏覽器拍開」。",
    dismiss: "關閉提示",
  },
} as const satisfies Record<keyof typeof copy, InAppBrowserNoticeCopy>;
