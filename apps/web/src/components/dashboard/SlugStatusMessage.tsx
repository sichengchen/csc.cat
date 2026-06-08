import type { ApiErrorCode } from "@csc/shared";
import type { SlugStatus } from "@/hooks/use-slug-availability";

type SlugStatusMessageProps = {
  status: SlugStatus;
  reason: ApiErrorCode | null;
  checkingLabel: string;
  availableLabel: string;
  unavailableLabel: string;
  errors: Record<ApiErrorCode, string>;
};

export function SlugStatusMessage({
  status,
  reason,
  checkingLabel,
  availableLabel,
  unavailableLabel,
  errors,
}: SlugStatusMessageProps) {
  if (status === "checking") {
    return <p className="text-xs text-muted-foreground">{checkingLabel}</p>;
  }

  if (status === "available") {
    return <p className="text-xs text-green-600 dark:text-green-500">{availableLabel}</p>;
  }

  if (status === "unavailable") {
    return <p className="text-xs text-destructive">{reason ? errors[reason] : unavailableLabel}</p>;
  }

  return null;
}
