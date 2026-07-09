import { ChevronDown, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { redirectPath } from "@csc/shared/redirects";
import { HomeBackground, type ThemeOverride } from "./HomeBackground";
import { copy, inAppBrowserNoticeCopy } from "./home-copy";
import { links } from "./home-links";
import { getInitialLanguage, htmlLanguages, languages, type Language } from "./home-language";

const socialInAppBrowserPattern =
  /FBAN|FBAV|FB_IAB|Instagram|Line|MicroMessenger|TikTok|Twitter|Snapchat|Pinterest|LinkedInApp|Reddit|XHS/i;

function isSocialInAppBrowser(userAgent: string) {
  return socialInAppBrowserPattern.test(userAgent);
}

function getThemeOverride(search: string): ThemeOverride | undefined {
  const theme = new URLSearchParams(search).get("theme");
  return theme === "light" || theme === "dark" ? theme : undefined;
}

export function HomePage() {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [showInAppBrowserNotice, setShowInAppBrowserNotice] = useState(false);
  const t = copy[language];
  const inAppBrowserNotice = inAppBrowserNoticeCopy[language];
  const isFrontPage = location.pathname === "/";
  const forceInAppBrowserNotice = new URLSearchParams(location.search).get("in-app") === "1";
  const themeOverride = getThemeOverride(location.search);

  useEffect(() => {
    document.documentElement.lang = htmlLanguages[language];
    document.title = t.meta.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", t.meta.description);
    window.localStorage.setItem("catalog-language", language);
  }, [language, t.meta.description, t.meta.title]);

  useEffect(() => {
    setShowInAppBrowserNotice(
      isFrontPage && (forceInAppBrowserNotice || isSocialInAppBrowser(window.navigator.userAgent)),
    );
  }, [forceInAppBrowserNotice, isFrontPage]);

  useEffect(() => {
    if (!themeOverride) {
      return;
    }

    document.documentElement.classList.toggle("dark", themeOverride === "dark");

    return () => {
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    };
  }, [themeOverride]);

  return (
    <main
      className="relative isolate flex min-h-svh flex-col items-center gap-6 overflow-hidden bg-background px-4 py-6 text-foreground sm:py-8"
    >
      <HomeBackground themeOverride={themeOverride} />

      {showInAppBrowserNotice ? (
        <Alert role="note" className="w-full max-w-md">
          <ExternalLink aria-hidden="true" />
          <AlertTitle>{inAppBrowserNotice.title}</AlertTitle>
          <AlertDescription>{inAppBrowserNotice.description}</AlertDescription>
          <AlertAction>
            <Button
              aria-label={inAppBrowserNotice.dismiss}
              onClick={() => setShowInAppBrowserNotice(false)}
              size="icon-xs"
              type="button"
              variant="ghost"
            >
              <X aria-hidden="true" data-icon="inline-start" />
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      <Card className="my-auto w-full max-w-md rounded-none bg-transparent shadow-none ring-0 sm:rounded-xl sm:bg-card sm:shadow-lg sm:ring-1">
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
                  className="h-auto min-h-18 w-full justify-start bg-card/90 p-0 text-left leading-normal whitespace-normal backdrop-blur-sm hover:border-foreground/20 hover:bg-card/95 hover:shadow-sm hover:shadow-foreground/5 hover:ring-1 hover:ring-foreground/5 active:translate-y-0 dark:bg-card/90 dark:hover:bg-card/95 dark:hover:shadow-black/20"
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
