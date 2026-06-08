import { SignIn, useAuth, useClerk } from "@clerk/react";
import type { ApiErrorCode, ExpiryPreset, SurlListItem } from "@csc/shared";
import { EXPIRY_PRESETS } from "@csc/shared";
import { ChevronDown, Copy, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
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
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSurlLanguage } from "@/hooks/use-surl-language";
import { languageOptions } from "@/lib/surl-i18n";
import {
  checkSlugAvailability,
  createLink,
  defaultExpiry,
  deleteLink,
  listLinks,
  suggestSlug,
  SurlApiError,
} from "@/lib/surl-api";

type SlugStatus = "idle" | "checking" | "available" | "unavailable";

function formatExpiry(
  expiresAt: number | null,
  expired: boolean,
  t: ReturnType<typeof useSurlLanguage>["t"],
): string {
  if (expiresAt === null) {
    return t.never;
  }
  if (expired) {
    return t.expired;
  }
  return new Date(expiresAt).toLocaleString();
}

function truncateUrl(url: string, max = 48): string {
  return url.length > max ? `${url.slice(0, max)}…` : url;
}

export function SurlDashboardPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { signOut } = useClerk();
  const { language, setLanguage, t } = useSurlLanguage();

  const [links, setLinks] = useState<SurlListItem[]>([]);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [destination, setDestination] = useState("");
  const [slug, setSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
  const [slugReason, setSlugReason] = useState<ApiErrorCode | null>(null);
  const [suggestingSlug, setSuggestingSlug] = useState(false);
  const [expiry, setExpiry] = useState<ExpiryPreset>(defaultExpiry);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SurlListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadLinks = useCallback(async () => {
    if (!isSignedIn) {
      return;
    }

    setLoadingLinks(true);
    try {
      const token = await getToken();
      const data = await listLinks(token);
      setLinks(data);
    } catch (error) {
      const message =
        error instanceof SurlApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    } finally {
      setLoadingLinks(false);
    }
  }, [getToken, isSignedIn, t.errors]);

  const refreshSuggestedSlug = useCallback(async () => {
    if (!isSignedIn) {
      return;
    }

    setSuggestingSlug(true);
    try {
      const token = await getToken();
      const suggested = await suggestSlug(token);
      setSlug(suggested);
    } catch (error) {
      const message =
        error instanceof SurlApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    } finally {
      setSuggestingSlug(false);
    }
  }, [getToken, isSignedIn, t.errors]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      void loadLinks();
      void refreshSuggestedSlug();
    }
  }, [isLoaded, isSignedIn, loadLinks, refreshSuggestedSlug]);

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
          const result = await checkSlugAvailability(token, normalized);
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
      const link = await createLink(token, {
        url: destination.trim(),
        slug: slug.trim().toLowerCase(),
        expiry,
      });
      setLinks((current) => [link, ...current]);
      setDestination("");
      setExpiry(defaultExpiry);
      await refreshSuggestedSlug();
      toast.success(t.createButton);
    } catch (error) {
      const message =
        error instanceof SurlApiError ? t.errors[error.code] : t.errors.validation_error;
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
      await deleteLink(token, deleteTarget.slug);
      setLinks((current) => current.filter((item) => item.slug !== deleteTarget.slug));
      setDeleteTarget(null);
      toast.success(t.confirmDelete);
    } catch (error) {
      const message =
        error instanceof SurlApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  }

  async function handleCopy(shortUrl: string) {
    try {
      await navigator.clipboard.writeText(shortUrl);
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
                <Label htmlFor="destination">{t.destinationLabel}</Label>
                <Input
                  id="destination"
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder={t.destinationPlaceholder}
                  required
                  type="url"
                  value={destination}
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
            <CardTitle>{t.linksTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLinks ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                {t.loading}
              </div>
            ) : links.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t.emptyLinks}</p>
            ) : (
              <div className="relative w-fit max-w-full overflow-x-auto">
                <table className="w-auto caption-bottom text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pr-4">{t.columns.slug}</TableHead>
                      <TableHead className="pr-4">{t.columns.destination}</TableHead>
                      <TableHead className="pr-3">{t.columns.expiry}</TableHead>
                      <TableHead className="sr-only">{t.columns.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {links.map((link) => (
                      <TableRow key={link.slug}>
                        <TableCell className="pr-4 font-medium">{link.slug}</TableCell>
                        <TableCell className="max-w-48 truncate pr-4" title={link.url}>
                          {truncateUrl(link.url, 28)}
                        </TableCell>
                        <TableCell className="pr-3 text-xs whitespace-nowrap">
                          {formatExpiry(link.expiresAt, link.expired, t)}
                        </TableCell>
                        <TableCell className="pl-1">
                          <div className="flex gap-1">
                            <Button
                              aria-label={t.copy}
                              onClick={() => void handleCopy(link.shortUrl)}
                              size="icon-sm"
                              type="button"
                              variant="outline"
                            >
                              <Copy />
                            </Button>
                            <Button
                              aria-label={t.delete}
                              onClick={() => setDeleteTarget(link)}
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
                </table>
              </div>
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
