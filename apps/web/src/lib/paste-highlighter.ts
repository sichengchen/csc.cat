import type { PasteLanguage } from "@csc/shared";

type PasteHighlighter = {
  codeToHtml: (code: string, options: { lang: string; theme: string }) => string;
};

let highlighterPromise: Promise<PasteHighlighter> | null = null;

function getColorScheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getPasteTheme(): "github-light" | "github-dark" {
  return getColorScheme() === "dark" ? "github-dark" : "github-light";
}

export async function getPasteHighlighter(): Promise<PasteHighlighter> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const { createHighlighter } = await import("shiki");
      const [
        bash,
        c,
        cpp,
        csharp,
        css,
        go,
        html,
        java,
        javascript,
        json,
        kotlin,
        markdown,
        php,
        python,
        ruby,
        rust,
        sql,
        swift,
        typescript,
        yaml,
      ] = await Promise.all([
        import("@shikijs/langs/bash"),
        import("@shikijs/langs/c"),
        import("@shikijs/langs/cpp"),
        import("@shikijs/langs/csharp"),
        import("@shikijs/langs/css"),
        import("@shikijs/langs/go"),
        import("@shikijs/langs/html"),
        import("@shikijs/langs/java"),
        import("@shikijs/langs/javascript"),
        import("@shikijs/langs/json"),
        import("@shikijs/langs/kotlin"),
        import("@shikijs/langs/markdown"),
        import("@shikijs/langs/php"),
        import("@shikijs/langs/python"),
        import("@shikijs/langs/ruby"),
        import("@shikijs/langs/rust"),
        import("@shikijs/langs/sql"),
        import("@shikijs/langs/swift"),
        import("@shikijs/langs/typescript"),
        import("@shikijs/langs/yaml"),
      ]);

      return createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: [
          bash.default,
          c.default,
          cpp.default,
          csharp.default,
          css.default,
          go.default,
          html.default,
          java.default,
          javascript.default,
          json.default,
          kotlin.default,
          markdown.default,
          php.default,
          python.default,
          ruby.default,
          rust.default,
          sql.default,
          swift.default,
          typescript.default,
          yaml.default,
        ],
      });
    })();
  }

  return highlighterPromise;
}

export async function highlightPaste(content: string, language: PasteLanguage): Promise<string> {
  if (language === "plain") {
    return "";
  }

  const highlighter = await getPasteHighlighter();
  return highlighter.codeToHtml(content, {
    lang: language,
    theme: getPasteTheme(),
  });
}
