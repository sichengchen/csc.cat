import { EXPIRY_PRESETS, type ExpiryPreset } from "@csc/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ExpirySelectProps = {
  id: string;
  value: ExpiryPreset;
  labels: Record<ExpiryPreset, string>;
  onChange: (value: ExpiryPreset) => void;
};

export function ExpirySelect({ id, value, labels, onChange }: ExpirySelectProps) {
  return (
    <Select onValueChange={(nextValue) => onChange(nextValue as ExpiryPreset)} value={value}>
      <SelectTrigger id={id}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {EXPIRY_PRESETS.map((preset) => (
          <SelectItem key={preset} value={preset}>
            {labels[preset]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
