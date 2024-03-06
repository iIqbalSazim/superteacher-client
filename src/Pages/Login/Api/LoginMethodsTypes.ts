export interface LoginPayload {
  email: string;
  password: string;
}

export interface LogoutPayload {
  token: string;
}

export interface TokenPayload {
  grant_type: string;
  email: string;
  password: string;
}

export interface ResetTokenPayload {
  email: string;
}

export interface ValidateResetTokenPayload {
  token: string;
  email: string;
}

export interface ResetPasswordPayload {
  password: {
    email: string;
    new_password: string;
  };
  token: string;
}
