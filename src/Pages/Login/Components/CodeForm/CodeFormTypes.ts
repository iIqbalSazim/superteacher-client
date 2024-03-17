import { UseFormReturn } from "react-hook-form";

export interface CodeFormValues {
  code: string;
}

export interface CodeFormProps {
  form: UseFormReturn<CodeFormValues>;
  onSubmit: (values: CodeFormValues) => void;
  isLoading: boolean;
  onBack: () => void;
}
