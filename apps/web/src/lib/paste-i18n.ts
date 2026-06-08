import type { ApiErrorCode, ExpiryPreset, PasteLanguage } from "@csc/shared";
import { pasteLanguageLabel, PASTE_LANGUAGES } from "@csc/shared";

export type PasteUiLanguage = "en" | "cat";

export const htmlLanguages: Record<PasteUiLanguage, string> = {
  en: "en",
  cat: "ca",
};

export const languageOptions: { code: PasteUiLanguage; label: string }[] = [
  { code: "cat", label: "Català" },
  { code: "en", label: "English" },
];

const expiryLabels: Record<PasteUiLanguage, Record<ExpiryPreset, string>> = {
  en: {
    "1d": "1 day",
    "7d": "7 days",
    "14d": "14 days",
    "1mo": "1 month",
    "3mo": "3 months",
    "6mo": "6 months",
    "1year": "1 year",
    forever: "Forever",
  },
  cat: {
    "1d": "1 dia",
    "7d": "7 dies",
    "14d": "14 dies",
    "1mo": "1 mes",
    "3mo": "3 mesos",
    "6mo": "6 mesos",
    "1year": "1 any",
    forever: "Per sempre",
  },
};

const errorMessages: Record<PasteUiLanguage, Record<ApiErrorCode, string>> = {
  en: {
    unauthorized: "You must sign in to continue.",
    invalid_slug: "Slug must be 3–32 lowercase letters, numbers, or hyphens.",
    slug_reserved: "This slug is reserved.",
    slug_taken: "This slug is already in use.",
    invalid_url: "Enter a valid http or https URL.",
    not_found: "Paste not found.",
    forbidden: "You can only delete your own pastes.",
    validation_error: "Please check the form and try again.",
  },
  cat: {
    unauthorized: "Has d'iniciar sessió per continuar.",
    invalid_slug: "L'identificador ha de tenir 3–32 caràcters en minúscules, números o guions.",
    slug_reserved: "Aquest identificador està reservat.",
    slug_taken: "Aquest identificador ja està en ús.",
    invalid_url: "Introdueix una URL vàlida amb http o https.",
    not_found: "Paste no trobat.",
    forbidden: "Només pots eliminar els teus propis pastes.",
    validation_error: "Revisa el formulari i torna-ho a provar.",
  },
};

export const copy = {
  en: {
    meta: {
      title: "Sicheng Chen | Paste",
      description: "Sicheng Chen | Paste",
    },
    language: "Language",
    title: "Paste",
    subtitle: "Create and manage csc.cat/p/ pastes",
    loading: "Loading…",
    signOut: "Sign out",
    createTitle: "New paste",
    contentLabel: "Content",
    contentPlaceholder: "Paste your text or code here…",
    slugLabel: "Slug",
    slugPlaceholder: "my-paste",
    regenerateSlug: "Regenerate",
    slugChecking: "Checking availability…",
    slugAvailable: "This slug is available.",
    slugUnavailable: "This slug is not available.",
    syntaxLabel: "Language",
    expiryLabel: "Expires",
    createButton: "Create paste",
    creating: "Creating…",
    pastesTitle: "Your pastes",
    emptyPastes: "No pastes yet.",
    columns: {
      slug: "Slug",
      preview: "Preview",
      language: "Language",
      expiry: "Expires",
      actions: "Actions",
    },
    expired: "Expired",
    never: "Never",
    copy: "Copy",
    copied: "Copied!",
    delete: "Delete",
    deleteTitle: "Delete paste?",
    deleteDescription: "This will permanently remove csc.cat/p/{slug}.",
    cancel: "Cancel",
    confirmDelete: "Delete",
    expiry: expiryLabels.en,
    errors: errorMessages.en,
    syntaxOptions: Object.fromEntries(
      PASTE_LANGUAGES.map((language) => [language, pasteLanguageLabel(language)]),
    ) as Record<PasteLanguage, string>,
  },
  cat: {
    meta: {
      title: "Sicheng Chen | Paste",
      description: "Sicheng Chen | Paste",
    },
    language: "Idioma",
    title: "Paste",
    subtitle: "Crea i gestiona pastes csc.cat/p/",
    loading: "Carregant…",
    signOut: "Tanca la sessió",
    createTitle: "Nou paste",
    contentLabel: "Contingut",
    contentPlaceholder: "Enganxa el teu text o codi aquí…",
    slugLabel: "Identificador",
    slugPlaceholder: "el-meu-paste",
    regenerateSlug: "Regenera",
    slugChecking: "Comprovant disponibilitat…",
    slugAvailable: "Aquest identificador està disponible.",
    slugUnavailable: "Aquest identificador no està disponible.",
    syntaxLabel: "Llenguatge",
    expiryLabel: "Caduca",
    createButton: "Crea el paste",
    creating: "Creant…",
    pastesTitle: "Els teus pastes",
    emptyPastes: "Encara no tens pastes.",
    columns: {
      slug: "Identificador",
      preview: "Previsualització",
      language: "Llenguatge",
      expiry: "Caduca",
      actions: "Accions",
    },
    expired: "Caducat",
    never: "Mai",
    copy: "Copia",
    copied: "Copiat!",
    delete: "Elimina",
    deleteTitle: "Eliminar el paste?",
    deleteDescription: "Això eliminarà permanentment csc.cat/p/{slug}.",
    cancel: "Cancel·la",
    confirmDelete: "Elimina",
    expiry: expiryLabels.cat,
    errors: errorMessages.cat,
    syntaxOptions: Object.fromEntries(
      PASTE_LANGUAGES.map((language) => [language, pasteLanguageLabel(language)]),
    ) as Record<PasteLanguage, string>,
  },
} as const;

export type PasteCopy = (typeof copy)[PasteUiLanguage];
