import type { PasteLanguage } from "@csc/shared";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { highlightPaste } from "@/lib/paste-highlighter";
import { cn } from "@/lib/utils";

type PasteCodeBlockProps = {
  content: string;
  language: PasteLanguage;
  className?: string;
};

export function PasteCodeBlock({ content, language, className }: PasteCodeBlockProps) {
  const [html, setHtml] = useState<string | null>(language === "plain" ? null : null);
  const [loading, setLoading] = useState(language !== "plain");

  useEffect(() => {
    if (language === "plain") {
      setHtml(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    void (async () => {
      try {
        const highlighted = await highlightPaste(content, language);
        if (!cancelled) {
          setHtml(highlighted);
        }
      } catch {
        if (!cancelled) {
          setHtml(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [content, language]);

  if (loading) {
    return (
      <div
        className={cn(
          "flex min-h-40 items-center justify-center rounded-lg border bg-muted/50 p-4",
          className,
        )}
      >
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (language === "plain" || !html) {
    return (
      <pre
        className={cn(
          "overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm leading-relaxed whitespace-pre-wrap",
          className,
        )}
      >
        {content}
      </pre>
    );
  }

  return (
    <div
      className={cn(
        "shiki-container overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm",
        "[&_pre]:m-0 [&_pre]:w-full [&_pre]:min-w-full [&_pre]:!bg-transparent [&_pre]:p-0",
        "[&_code]:!bg-transparent",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
