import { SignIn, useAuth, useClerk } from "@clerk/react";
import type { ApiErrorCode, ExpiryPreset, PasteLanguage, PasteListItem } from "@csc/shared";
import { EXPIRY_PRESETS, PASTE_LANGUAGES } from "@csc/shared";
import { ChevronDown, Copy, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { usePasteLanguage } from "@/hooks/use-paste-language";
import {
  checkPasteSlugAvailability,
  createPaste,
  defaultPasteExpiry,
  deletePaste,
  listPastes,
  PasteApiError,
  suggestPasteSlug,
} from "@/lib/paste-api";
import { languageOptions } from "@/lib/paste-i18n";

type SlugStatus = "idle" | "checking" | "available" | "unavailable";

function formatExpiry(
  expiresAt: number | null,
  expired: boolean,
  t: ReturnType<typeof usePasteLanguage>["t"],
): string {
  if (expiresAt === null) {
    return t.never;
  }
  if (expired) {
    return t.expired;
  }
  return new Date(expiresAt).toLocaleString();
}

export function PasteDashboardPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { signOut } = useClerk();
  const { language, setLanguage, t } = usePasteLanguage();

  const [pastes, setPastes] = useState<PasteListItem[]>([]);
  const [loadingPastes, setLoadingPastes] = useState(false);
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
  const [slugReason, setSlugReason] = useState<ApiErrorCode | null>(null);
  const [suggestingSlug, setSuggestingSlug] = useState(false);
  const [syntaxLanguage, setSyntaxLanguage] = useState<PasteLanguage>("plain");
  const [expiry, setExpiry] = useState<ExpiryPreset>(defaultPasteExpiry);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PasteListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadPastes = useCallback(async () => {
    if (!isSignedIn) {
      return;
    }

    setLoadingPastes(true);
    try {
      const token = await getToken();
      const data = await listPastes(token);
      setPastes(data);
    } catch (error) {
      const message =
        error instanceof PasteApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    } finally {
      setLoadingPastes(false);
    }
  }, [getToken, isSignedIn, t.errors]);

  const refreshSuggestedSlug = useCallback(async () => {
    if (!isSignedIn) {
      return;
    }

    setSuggestingSlug(true);
    try {
      const token = await getToken();
      const suggested = await suggestPasteSlug(token);
      setSlug(suggested);
    } catch (error) {
      const message =
        error instanceof PasteApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    } finally {
      setSuggestingSlug(false);
    }
  }, [getToken, isSignedIn, t.errors]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      void loadPastes();
      void refreshSuggestedSlug();
    }
  }, [isLoaded, isSignedIn, loadPastes, refreshSuggestedSlug]);

  useEffect(() => {
    if (!isSignedIn || !slug.trim()) {
      setSlugStatus("idle");
      setSlugReason(null);
      return;
    }

    const normalized = slug.trim().toLowerCase();
    setSlugStatus("checking");
    const timeout = window.setTimeout(() => {
      void (async () => {
        try {
          const token = await getToken();
          const result = await checkPasteSlugAvailability(token, normalized);
          if (result.available) {
            setSlugStatus("available");
            setSlugReason(null);
          } else {
            setSlugStatus("unavailable");
            setSlugReason(result.reason ?? "slug_taken");
          }
        } catch {
          setSlugStatus("idle");
          setSlugReason(null);
        }
      })();
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [getToken, isSignedIn, slug]);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();

    if (slugStatus !== "available") {
      const message = slugReason ? t.errors[slugReason] : t.slugUnavailable;
      toast.error(message);
      return;
    }

    setCreating(true);

    try {
      const token = await getToken();
      const paste = await createPaste(token, {
        content: content.trim(),
        slug: slug.trim().toLowerCase(),
        language: syntaxLanguage,
        expiry,
      });
      setPastes((current) => [paste, ...current]);
      setContent("");
      setSyntaxLanguage("plain");
      setExpiry(defaultPasteExpiry);
      await refreshSuggestedSlug();
      toast.success(t.createButton);
    } catch (error) {
      const message =
        error instanceof PasteApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return;
    }

    setDeleting(true);
    try {
      const token = await getToken();
      await deletePaste(token, deleteTarget.slug);
      setPastes((current) => current.filter((item) => item.slug !== deleteTarget.slug));
      setDeleteTarget(null);
      toast.success(t.confirmDelete);
    } catch (error) {
      const message =
        error instanceof PasteApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  }

  async function handleCopy(pasteUrl: string) {
    try {
      await navigator.clipboard.writeText(pasteUrl);
      toast.success(t.copied);
    } catch {
      toast.error(t.errors.validation_error);
    }
  }

  if (!isLoaded) {
    return (
      <main className="grid min-h-svh place-items-center bg-background text-foreground">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          {t.loading}
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="grid min-h-svh place-items-center bg-background px-4 py-8 text-foreground">
        <SignIn routing="hash" />
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-background px-4 py-6 text-foreground sm:grid sm:place-items-center sm:py-8">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label={t.language} size="sm" type="button" variant="outline">
                  {languageOptions.find((option) => option.code === language)?.label}
                  <ChevronDown aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  onValueChange={(value) => setLanguage(value as typeof language)}
                  value={language}
                >
                  {languageOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.code} value={option.code}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => signOut()} size="sm" type="button" variant="outline">
              {t.signOut}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.createTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleCreate}>
              <div className="grid gap-2">
                <Label htmlFor="content">{t.contentLabel}</Label>
                <Textarea
                  className="min-h-40 font-mono text-sm"
                  id="content"
                  onChange={(event) => setContent(event.target.value)}
                  placeholder={t.contentPlaceholder}
                  required
                  spellCheck={false}
                  value={content}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">{t.slugLabel}</Label>
                <div className="flex gap-2">
                  <Input
                    aria-invalid={slugStatus === "unavailable"}
                    autoComplete="off"
                    className="min-w-0 flex-1"
                    id="slug"
                    onChange={(event) => setSlug(event.target.value.toLowerCase())}
                    pattern="[a-z0-9][a-z0-9-]{1,30}[a-z0-9]"
                    placeholder={t.slugPlaceholder}
                    required
                    spellCheck={false}
                    value={slug}
                  />
                  <Button
                    aria-label={t.regenerateSlug}
                    disabled={suggestingSlug}
                    onClick={() => void refreshSuggestedSlug()}
                    size="icon"
                    title={t.regenerateSlug}
                    type="button"
                    variant="outline"
                  >
                    <RefreshCw className={suggestingSlug ? "animate-spin" : undefined} />
                  </Button>
                </div>
                {slugStatus === "checking" ? (
                  <p className="text-xs text-muted-foreground">{t.slugChecking}</p>
                ) : null}
                {slugStatus === "available" ? (
                  <p className="text-xs text-green-600 dark:text-green-500">{t.slugAvailable}</p>
                ) : null}
                {slugStatus === "unavailable" ? (
                  <p className="text-xs text-destructive">
                    {slugReason ? t.errors[slugReason] : t.slugUnavailable}
                  </p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="syntax">{t.syntaxLabel}</Label>
                <Select
                  onValueChange={(value) => setSyntaxLanguage(value as PasteLanguage)}
                  value={syntaxLanguage}
                >
                  <SelectTrigger id="syntax">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PASTE_LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {t.syntaxOptions[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">{t.expiryLabel}</Label>
                <Select onValueChange={(value) => setExpiry(value as ExpiryPreset)} value={expiry}>
                  <SelectTrigger id="expiry">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPIRY_PRESETS.map((preset) => (
                      <SelectItem key={preset} value={preset}>
                        {t.expiry[preset]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-fit"
                disabled={creating || slugStatus !== "available" || suggestingSlug}
                type="submit"
              >
                {creating ? t.creating : t.createButton}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.pastesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPastes ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                {t.loading}
              </div>
            ) : pastes.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t.emptyPastes}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[1%] pr-4 whitespace-nowrap">
                      {t.columns.slug}
                    </TableHead>
                    <TableHead className="min-w-0 pr-4">{t.columns.preview}</TableHead>
                    <TableHead className="w-[1%] pr-3 whitespace-nowrap">
                      {t.columns.language}
                    </TableHead>
                    <TableHead className="w-[1%] pr-3 whitespace-nowrap">
                      {t.columns.expiry}
                    </TableHead>
                    <TableHead className="w-[1%]">
                      <span className="sr-only">{t.columns.actions}</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastes.map((paste) => (
                    <TableRow key={paste.slug}>
                      <TableCell className="pr-4 font-medium">{paste.slug}</TableCell>
                      <TableCell className="max-w-0 truncate pr-4" title={paste.contentPreview}>
                        {paste.contentPreview}
                      </TableCell>
                      <TableCell className="pr-3 whitespace-nowrap">
                        <Badge variant="secondary">{t.syntaxOptions[paste.language]}</Badge>
                      </TableCell>
                      <TableCell className="pr-3 text-xs whitespace-nowrap">
                        {formatExpiry(paste.expiresAt, paste.expired, t)}
                      </TableCell>
                      <TableCell className="pl-1">
                        <div className="flex gap-1">
                          <Button
                            aria-label={t.copy}
                            onClick={() => void handleCopy(paste.pasteUrl)}
                            size="icon-sm"
                            type="button"
                            variant="outline"
                          >
                            <Copy />
                          </Button>
                          <Button
                            aria-label={t.delete}
                            onClick={() => setDeleteTarget(paste)}
                            size="icon-sm"
                            type="button"
                            variant="destructive"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog onOpenChange={(open) => !open && setDeleteTarget(null)} open={deleteTarget !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteTitle}</DialogTitle>
            <DialogDescription>
              {t.deleteDescription.replace("{slug}", deleteTarget?.slug ?? "")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDeleteTarget(null)} type="button" variant="outline">
              {t.cancel}
            </Button>
            <Button
              disabled={deleting}
              onClick={() => void handleDelete()}
              type="button"
              variant="destructive"
            >
              {deleting ? t.loading : t.confirmDelete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
