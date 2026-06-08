import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
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
import { redirectPath } from "@csc/shared/redirects";
import { copy } from "./home-copy";
import { desktopBackgroundImages, links } from "./home-links";
import { getInitialLanguage, htmlLanguages, languages, type Language } from "./home-language";

export function HomePage() {
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
