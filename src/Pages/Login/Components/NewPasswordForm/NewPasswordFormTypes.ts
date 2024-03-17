import { UseFormReturn } from "react-hook-form";

import { ForgotPasswordResetValues } from "../ForgotPasswordModal/ForgotPasswordModalTypes";

export interface NewPasswordFormProps {
  form: UseFormReturn<ForgotPasswordResetValues>;
  onSubmit: (values: ForgotPasswordResetValues) => void;
  isLoading: boolean;
  onBack: () => void;
}
