export interface ResetPasswordModalProps {
  open: boolean;
  close: () => void;
}

export interface ResetPasswordFormValues {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
