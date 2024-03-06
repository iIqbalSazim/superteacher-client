import { UseFormReturnType } from "@mantine/form";

export interface CodeFormValues {
  code: string;
}

export interface CodeFormProps {
  form: UseFormReturnType<CodeFormValues>;
  onSubmit: (values: CodeFormValues) => void;
  isLoading: boolean;
  onBack: () => void;
}
