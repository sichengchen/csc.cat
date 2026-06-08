import type { ApiErrorCode, ExpiryPreset } from "@csc/shared";

export type SurlLanguage = "en" | "cat";

export const htmlLanguages: Record<SurlLanguage, string> = {
  en: "en",
  cat: "ca",
};

export const languageOptions: { code: SurlLanguage; label: string }[] = [
  { code: "cat", label: "Català" },
  { code: "en", label: "English" },
];

const expiryLabels: Record<SurlLanguage, Record<ExpiryPreset, string>> = {
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

const errorMessages: Record<SurlLanguage, Record<ApiErrorCode, string>> = {
  en: {
    unauthorized: "You must sign in to continue.",
    invalid_slug: "Slug must be 3–32 lowercase letters, numbers, or hyphens.",
    slug_reserved: "This slug is reserved.",
    slug_taken: "This slug is already in use.",
    invalid_url: "Enter a valid http or https URL.",
    not_found: "Link not found.",
    forbidden: "You can only delete your own links.",
    validation_error: "Please check the form and try again.",
  },
  cat: {
    unauthorized: "Has d'iniciar sessió per continuar.",
    invalid_slug: "L'identificador ha de tenir 3–32 caràcters en minúscules, números o guions.",
    slug_reserved: "Aquest identificador està reservat.",
    slug_taken: "Aquest identificador ja està en ús.",
    invalid_url: "Introdueix una URL vàlida amb http o https.",
    not_found: "Enllaç no trobat.",
    forbidden: "Només pots eliminar els teus propis enllaços.",
    validation_error: "Revisa el formulari i torna-ho a provar.",
  },
};

export const copy = {
  en: {
    meta: {
      title: "Sicheng Chen | Short Links",
      description: "Sicheng Chen | Short Links",
    },
    language: "Language",
    title: "Short Links",
    subtitle: "Create and manage csc.cat/s/ links",
    signInTitle: "Sign in required",
    signInDescription: "Sign in with your scchan.com account to manage short links.",
    loading: "Loading…",
    signOut: "Sign out",
    createTitle: "New short link",
    destinationLabel: "Destination URL",
    destinationPlaceholder: "https://example.com/page",
    slugLabel: "Slug",
    slugPlaceholder: "my-link",
    regenerateSlug: "Regenerate",
    slugChecking: "Checking availability…",
    slugAvailable: "This slug is available.",
    slugUnavailable: "This slug is not available.",
    expiryLabel: "Expires",
    createButton: "Create link",
    creating: "Creating…",
    linksTitle: "Your links",
    emptyLinks: "No short links yet.",
    columns: {
      slug: "Slug",
      destination: "Destination",
      expiry: "Expires",
      actions: "Actions",
    },
    expired: "Expired",
    never: "Never",
    copy: "Copy",
    copied: "Copied!",
    delete: "Delete",
    deleteTitle: "Delete short link?",
    deleteDescription: "This will permanently remove csc.cat/s/{slug}.",
    cancel: "Cancel",
    confirmDelete: "Delete",
    expiry: expiryLabels.en,
    errors: errorMessages.en,
  },
  cat: {
    meta: {
      title: "Sicheng Chen | Enllaços curts",
      description: "Sicheng Chen | Enllaços curts",
    },
    language: "Idioma",
    title: "Enllaços curts",
    subtitle: "Crea i gestiona enllaços csc.cat/s/",
    signInTitle: "Cal iniciar sessió",
    signInDescription:
      "Inicia sessió amb el teu compte de scchan.com per gestionar enllaços curts.",
    loading: "Carregant…",
    signOut: "Tanca la sessió",
    createTitle: "Nou enllaç curt",
    destinationLabel: "URL de destinació",
    destinationPlaceholder: "https://exemple.cat/pagina",
    slugLabel: "Identificador",
    slugPlaceholder: "el-meu-enllaç",
    regenerateSlug: "Regenera",
    slugChecking: "Comprovant disponibilitat…",
    slugAvailable: "Aquest identificador està disponible.",
    slugUnavailable: "Aquest identificador no està disponible.",
    expiryLabel: "Caduca",
    createButton: "Crea l'enllaç",
    creating: "Creant…",
    linksTitle: "Els teus enllaços",
    emptyLinks: "Encara no tens enllaços curts.",
    columns: {
      slug: "Identificador",
      destination: "Destinació",
      expiry: "Caduca",
      actions: "Accions",
    },
    expired: "Caducat",
    never: "Mai",
    copy: "Copia",
    copied: "Copiat!",
    delete: "Elimina",
    deleteTitle: "Eliminar l'enllaç curt?",
    deleteDescription: "Això eliminarà permanentment csc.cat/s/{slug}.",
    cancel: "Cancel·la",
    confirmDelete: "Elimina",
    expiry: expiryLabels.cat,
    errors: errorMessages.cat,
  },
} as const;

export type SurlCopy = (typeof copy)[SurlLanguage];
