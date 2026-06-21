import { pasteLanguageLabel, type PastePublicItem } from "@csc/shared";
import { Copy, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { PasteCodeBlock } from "@/components/PasteCodeBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePasteLanguage } from "@/hooks/use-paste-language";
import { fetchPublicPaste, PasteApiError } from "@/lib/paste-api";
import { htmlLanguages } from "@/lib/paste-i18n";

type ViewState =
  | { status: "loading" }
  | { status: "ready"; paste: PastePublicItem }
  | { status: "not_found" }
  | { status: "gone" }
  | { status: "error" };

function formatDate(timestamp: number, locale: string): string {
  return new Date(timestamp).toLocaleString(locale);
}

function formatExpiry(expiresAt: number | null, locale: string, neverLabel: string): string {
  if (expiresAt === null) {
    return neverLabel;
  }
  return formatDate(expiresAt, locale);
}

export function PasteViewPage() {
  const { slug = "" } = useParams();
  const [searchParams] = useSearchParams();
  const isRaw = searchParams.get("raw") === "1";
  const { language, t } = usePasteLanguage();
  const locale = htmlLanguages[language];
  const [state, setState] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    if (!slug) {
      setState({ status: "not_found" });
      return;
    }

    let cancelled = false;
    setState({ status: "loading" });

    void (async () => {
      try {
        const paste = await fetchPublicPaste(slug.toLowerCase());
        if (!cancelled) {
          setState({ status: "ready", paste });
        }
      } catch (error) {
        if (cancelled) {
          return;
        }
        if (error instanceof PasteApiError && error.status === 410) {
          setState({ status: "gone" });
          return;
        }
        setState({ status: "not_found" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function handleCopy(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(t.copied);
    } catch {
      toast.error(t.copyFailed);
    }
  }

  if (state.status === "loading") {
    if (isRaw) {
      return (
        <main className="min-h-svh bg-background px-4 py-8 font-mono text-sm text-foreground">
          {t.loading}
        </main>
      );
    }

    return (
      <main className="grid min-h-svh place-items-center bg-background px-4 py-8 text-foreground">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          {t.public.loading}
        </div>
      </main>
    );
  }

  if (state.status === "not_found" || state.status === "gone" || state.status === "error") {
    const message = state.status === "gone" ? t.public.expired : t.public.notFound;

    if (isRaw) {
      return (
        <main className="min-h-svh bg-background px-4 py-8 font-mono text-sm text-foreground">
          {message}
        </main>
      );
    }

    return (
      <main className="grid min-h-svh place-items-center bg-background px-4 py-8 text-foreground">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{message}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline">
              <a href="/">{t.public.back}</a>
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  const { paste } = state;

  if (isRaw) {
    return (
      <main className="min-h-svh bg-background px-4 py-8 text-foreground">
        <pre className="whitespace-pre-wrap font-mono text-sm">{paste.content}</pre>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-background px-4 py-8 text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <Card>
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <CardTitle className="font-mono text-lg">csc.cat/p/{paste.slug}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{pasteLanguageLabel(paste.language)}</Badge>
                <Badge variant="outline">
                  {t.public.expires.replace(
                    "{date}",
                    formatExpiry(paste.expiresAt, locale, t.never),
                  )}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {t.public.created.replace("{date}", formatDate(paste.createdAt, locale))}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <PasteCodeBlock content={paste.content} language={paste.language} />
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => void handleCopy(paste.content)}
                type="button"
                variant="outline"
              >
                <Copy />
                {t.copy}
              </Button>
              <Button asChild type="button" variant="outline">
                <a href={`?raw=1`} rel="noopener noreferrer" target="_blank">
                  <ExternalLink />
                  {t.public.rawText}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
