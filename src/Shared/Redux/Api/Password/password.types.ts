export type TResetTokenPayload = {
  email: string;
};

export type TValidateResetTokenPayload = {
  token: string;
  email: string;
};

export type TResetForgotPasswordPayload = {
  password: {
    email: string;
    new_password: string;
  };
  token: string;
};

export type TResetPasswordPayload = {
  old_password: string;
  new_password: string;
};
