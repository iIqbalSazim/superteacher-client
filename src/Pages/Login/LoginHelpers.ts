import { notifications } from "@mantine/notifications";
import { NavigateFunction } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

import { setUser } from "@/Shared/Redux/Slices/AuthSlice/AuthSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { AppDispatch } from "@/Shared/Redux/StoreTypes";
import {
  useGenerateTokenMutation,
  useLoginMutation,
} from "@/Shared/Redux/Api/Auth/auth.api";

import { LoginFormValues } from "./Components/LoginForm/LoginFormTypes";
import {
  generateResetToken,
  resetForgotPassword,
  validateResetToken,
} from "./Api/LoginMethods";

export interface ResetTokenParams {
  email: string;
}

export interface ValidateTokenParams {
  code: string;
  email: string;
}

export interface ResetForgotPasswordParams {
  emailForm: UseFormReturn<{ email: string }>;
  codeForm: UseFormReturn<{ code: string }>;
  newPasswordForm: UseFormReturn<{
    new_password: string;
    confirm_new_password: string;
  }>;
}

export const LoginUserAndGenerateToken = async (
  values: LoginFormValues,
  reset: () => void,
  dispatch: AppDispatch,
  navigate: NavigateFunction
): Promise<void> => {
  const [loginUser] = useLoginMutation();
  const [generateToken] = useGenerateTokenMutation();

  try {
    const loginResult = await loginUser(values).unwrap();
    const newUser = loginResult.user;

    const tokenResult = await generateToken({
      grant_type: "password",
      email: values.email,
      password: values.password,
    }).unwrap();
    const token = tokenResult.access_token;

    dispatch(setUser(newUser));

    localStorage.setItem("token", token);

    navigate("/dashboard");

    notifications.show({
      color: "sazim-green",
      title: "Success",
      message: "Logged in successfully",
      autoClose: 3000,
    });

    reset();
  } catch (error) {
    handleErrorMessage(error);
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
    const { emailForm, codeForm, newPasswordForm } = params;

    setIsLoading(true);

    const response = await resetForgotPassword({
      password: {
        email: emailForm.getValues("email"),
        new_password: newPasswordForm.getValues("new_password"),
      },
      token: codeForm.getValues("code"),
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
