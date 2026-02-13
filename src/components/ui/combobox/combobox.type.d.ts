export type ComboboxOption = {
  value: string;
  label: string;
};

export interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
}

