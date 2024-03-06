import { notifications } from "@mantine/notifications";

import { setUser } from "@/Stores/Slices/AuthSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { LoginFormValues } from "./Components/LoginForm/LoginFormTypes";

import {
  generateResetToken,
  resetForgotPassword,
  validateResetToken,
  loginUser,
  generateToken,
} from "./Api/LoginMethods";
import { EmailFormValues } from "./Components/EmailForm/EmailFormTypes";
import { CodeFormValues } from "./Components/CodeForm/CodeFormTypes";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "@/Stores/Types/StoreTypes";

export interface ResetTokenParams {
  email: string;
}

export interface ValidateTokenParams {
  code: string;
  email: string;
}

export interface ResetForgotPasswordParams {
  emailForm: { values: EmailFormValues; reset: () => void };
  codeForm: { values: CodeFormValues; reset: () => void };
  newPasswordForm: { reset: () => void };
  new_password: string;
}

export const LoginUserAndGenerateToken = async (
  values: LoginFormValues,
  form: { reset: () => void },
  dispatch: AppDispatch,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    const response = await loginUser({ ...values });

    const newUser = response.data.user;

    const tokenRequest = await generateToken({
      grant_type: "password",
      email: values.email,
      password: values.password,
    });

    const token = tokenRequest.data.access_token;

    dispatch(setUser(newUser));

    localStorage.setItem("token", token);

    navigate("/dashboard");

    notifications.show({
      color: "sazim-green",
      title: "Success",
      message: "Logged in successfully",
      autoClose: 3000,
    });

    form.reset();
  } catch (error) {
    handleErrorMessage(error);
  }
};

export const GenerateResetToken = async (
  params: ResetTokenParams,
  setStep: (arg: "code") => void,
  setIsLoading: (arg: boolean) => void
): Promise<void> => {
  try {
    setIsLoading(true);

    const response = await generateResetToken({ email: params.email });

    if (response.status === 200) {
      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: `Email with a code was sent to ${params.email}`,
      });

      setStep("code");
    }

    setIsLoading(false);
  } catch (error) {
    handleErrorMessage(error);

    setIsLoading(false);
  }
};

export const ValidateResetToken = async (
  params: ValidateTokenParams,
  setStep: (arg: "password") => void,
  setIsLoading: (arg: boolean) => void
): Promise<void> => {
  try {
    setIsLoading(true);

    const response = await validateResetToken({
      token: params.code,
      email: params.email,
    });

    if (response.status === 200) {
      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Code valid. Please reset your password.",
        autoClose: 3000,
      });

      setStep("password");
    }

    setIsLoading(false);
  } catch (error) {
    handleErrorMessage(error);

    setIsLoading(false);
  }
};

export const ResetForgotPassword = async (
  params: ResetForgotPasswordParams,
  setStep: (arg: "email") => void,
  setIsLoading: (arg: boolean) => void,
  close: () => void
): Promise<void> => {
  try {
    const { emailForm, codeForm, newPasswordForm, new_password } = params;

    setIsLoading(true);

    const response = await resetForgotPassword({
      password: {
        email: emailForm.values.email,
        new_password: new_password,
      },
      token: codeForm.values.code,
    });

    if (response.status === 200) {
      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Password was reset successfully",
      });

      emailForm.reset();
      codeForm.reset();
      newPasswordForm.reset();

      setStep("email");
      close();
    }

    setIsLoading(false);
  } catch (error) {
    handleErrorMessage(error);

    setIsLoading(false);
  }
};
