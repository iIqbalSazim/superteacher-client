export interface ForgotPasswordModalProps {
  open: boolean;
  close: () => void;
}

export interface ForgotPasswordResetValues {
  new_password: string;
  confirm_new_password: string;
}
