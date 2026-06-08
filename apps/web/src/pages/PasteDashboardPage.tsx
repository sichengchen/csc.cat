import { SignIn, useAuth, useClerk } from "@clerk/react";
import type { ExpiryPreset, PasteLanguage, PasteListItem } from "@csc/shared";
import { PASTE_LANGUAGES } from "@csc/shared";
import { Copy, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { ExpirySelect } from "@/components/dashboard/ExpirySelect";
import { SlugStatusMessage } from "@/components/dashboard/SlugStatusMessage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useAuthenticatedResourceList } from "@/hooks/use-authenticated-resource-list";
import { usePasteLanguage } from "@/hooks/use-paste-language";
import { useSlugAvailability } from "@/hooks/use-slug-availability";
import { useSuggestedSlug } from "@/hooks/use-suggested-slug";
import { formatExpiry } from "@/lib/format-expiry";
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

export function PasteDashboardPage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { signOut } = useClerk();
  const { language, setLanguage, t } = usePasteLanguage();

  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [syntaxLanguage, setSyntaxLanguage] = useState<PasteLanguage>("plain");
  const [expiry, setExpiry] = useState<ExpiryPreset>(defaultPasteExpiry);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PasteListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleApiError = useCallback(
    (error: unknown) => {
      const message =
        error instanceof PasteApiError ? t.errors[error.code] : t.errors.validation_error;
      toast.error(message);
    },
    [t.errors],
  );

  const {
    items: pastes,
    setItems: setPastes,
    loading: loadingPastes,
    loadItems: loadPastes,
  } = useAuthenticatedResourceList({
    enabled: Boolean(isSignedIn),
    getToken,
    listItems: listPastes,
    onError: handleApiError,
  });

  const { suggesting: suggestingSlug, refreshSuggestedSlug } = useSuggestedSlug({
    enabled: Boolean(isSignedIn),
    getToken,
    suggestSlug: suggestPasteSlug,
    onSuggestedSlug: setSlug,
    onError: handleApiError,
  });

  const { status: slugStatus, reason: slugReason } = useSlugAvailability({
    enabled: Boolean(isSignedIn),
    slug,
    getToken,
    checkAvailability: checkPasteSlugAvailability,
  });

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      void loadPastes();
      void refreshSuggestedSlug();
    }
  }, [isLoaded, isSignedIn, loadPastes, refreshSuggestedSlug]);

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
      handleApiError(error);
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
      handleApiError(error);
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
        <DashboardHeader
          language={language}
          languageLabel={t.language}
          languageOptions={languageOptions}
          onLanguageChange={setLanguage}
          onSignOut={() => void signOut()}
          signOutLabel={t.signOut}
          subtitle={t.subtitle}
          title={t.title}
        />

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
                <SlugStatusMessage
                  availableLabel={t.slugAvailable}
                  checkingLabel={t.slugChecking}
                  errors={t.errors}
                  reason={slugReason}
                  status={slugStatus}
                  unavailableLabel={t.slugUnavailable}
                />
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
                <ExpirySelect id="expiry" labels={t.expiry} onChange={setExpiry} value={expiry} />
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

      <DeleteConfirmDialog
        cancelLabel={t.cancel}
        confirmLabel={t.confirmDelete}
        deleting={deleting}
        description={t.deleteDescription.replace("{slug}", deleteTarget?.slug ?? "")}
        loadingLabel={t.loading}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void handleDelete()}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        open={deleteTarget !== null}
        title={t.deleteTitle}
      />
    </main>
  );
}
