import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LanguageOption<TLanguage extends string> = {
  code: TLanguage;
  label: string;
};

type DashboardHeaderProps<TLanguage extends string> = {
  title: string;
  subtitle: string;
  language: TLanguage;
  languageLabel: string;
  languageOptions: LanguageOption<TLanguage>[];
  signOutLabel: string;
  onLanguageChange: (language: TLanguage) => void;
  onSignOut: () => void;
};

export function DashboardHeader<TLanguage extends string>({
  title,
  subtitle,
  language,
  languageLabel,
  languageOptions,
  signOutLabel,
  onLanguageChange,
  onSignOut,
}: DashboardHeaderProps<TLanguage>) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label={languageLabel} size="sm" type="button" variant="outline">
              {languageOptions.find((option) => option.code === language)?.label}
              <ChevronDown aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{languageLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              onValueChange={(value) => onLanguageChange(value as TLanguage)}
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
        <Button onClick={onSignOut} size="sm" type="button" variant="outline">
          {signOutLabel}
        </Button>
      </div>
    </div>
  );
}
