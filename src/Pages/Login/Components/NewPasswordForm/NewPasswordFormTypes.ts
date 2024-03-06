import { UseFormReturnType } from "@mantine/form";

import { ForgotPasswordResetValues } from "../ForgotPasswordModal/ForgotPasswordModalTypes";

export interface NewPasswordFormProps {
  form: UseFormReturnType<ForgotPasswordResetValues>;
  onSubmit: (values: ForgotPasswordResetValues) => void;
  isLoading: boolean;
  onBack: () => void;
}
