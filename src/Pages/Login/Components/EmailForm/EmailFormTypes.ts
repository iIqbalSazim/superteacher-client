import { UseFormReturnType } from "@mantine/form";

export interface EmailFormValues {
  email: string;
}

export interface EmailFormProps {
  form: UseFormReturnType<EmailFormValues>;
  onSubmit: (values: EmailFormValues) => void;
  isLoading: boolean;
  onCancel: () => void;
}
