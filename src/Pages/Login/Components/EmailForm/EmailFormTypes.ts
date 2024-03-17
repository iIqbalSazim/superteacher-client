import { UseFormReturn } from "react-hook-form";

export interface EmailFormValues {
  email: string;
}

export interface EmailFormProps {
  form: UseFormReturn<EmailFormValues>;
  onSubmit: (values: EmailFormValues) => void;
  isLoading: boolean;
  onCancel: () => void;
}
