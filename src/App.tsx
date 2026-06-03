import { AppWindow, ChevronDown, Home, Monitor } from "lucide-react";
import { SiBluesky, SiGithub, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
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

type Language = "en" | "cat";

type LinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

type LinkItem = {
  id: "homepage" | "system" | "apps" | "github" | "instagram" | "bluesky" | "x" | "linkedin";
  href: string;
  icon: LinkIcon;
};

const links: LinkItem[] = [
  { id: "homepage", href: "https://scchan.com", icon: Home },
  { id: "system", href: "https://scchan.com/system", icon: Monitor },
  { id: "apps", href: "https://www.scchan.moe/apps", icon: AppWindow },
  { id: "github", href: "https://github.com/sichengchen", icon: SiGithub },
  {
    id: "instagram",
    href: "https://www.instagram.com/chensc03/",
    icon: SiInstagram,
  },
  {
    id: "bluesky",
    href: "https://bsky.app/profile/scchan.com",
    icon: SiBluesky,
  },
  { id: "x", href: "https://x.com/syzen_zen", icon: SiX },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/sichengchen/",
    icon: LinkedinIcon,
  },
];

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "cat", label: "Català" },
];

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
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
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
    copyright: "© 2026 Sicheng Chen. All rights reserved.",
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
      github: {
        title: "GitHub",
        description: "@sichengchen",
      },
      instagram: {
        title: "Instagram",
        description: "@chensc03",
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
} as const;

function getInitialLanguage(): Language {
  const saved = window.localStorage.getItem("catalog-language");

  if (saved === "en" || saved === "cat") {
    return saved;
  }

  if (saved === "ca") {
    return "cat";
  }

  return navigator.language.toLowerCase().startsWith("ca") ? "cat" : "en";
}

export function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [desktopBackgroundImage] = useState(
    () => desktopBackgroundImages[Math.floor(Math.random() * desktopBackgroundImages.length)],
  );
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "cat" ? "ca" : "en";
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
                  <a href={link.href}>
                    <span className="flex w-full items-start gap-3 p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                        <Icon aria-hidden="true" className="size-5" focusable="false" />
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

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.53V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}
