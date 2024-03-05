import { notifications } from "@mantine/notifications";

import { setUser } from "@/Stores/Slices/AuthSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import {
  generateResetToken,
  resetForgotPassword,
  validateResetToken,
  loginUser,
  generateToken,
} from "./Api/LoginMethods";

export const loginUserAndGenerateToken = async (
  values,
  dispatch,
  navigate,
  form
) => {
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

export const GenerateResetToken = async (email, setStep, setIsLoading) => {
  try {
    setIsLoading(true);

    const response = await generateResetToken({ email });

    if (response.status === 200) {
      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: `Email with a code was sent to ${email}`,
      });

      setStep("code");
    }

    setIsLoading(false);
  } catch (error) {
    let message = error.message;

    if (error.data && error.data.message) {
      message = error.data.message;
    }

    notifications.show({
      color: "red",
      title: "Error",
      message: message,
    });

    setIsLoading(false);
  }
};

export const ValidateResetToken = async (
  code,
  email,
  setStep,
  setIsLoading
) => {
  try {
    setIsLoading(true);

    const response = await validateResetToken({
      token: code,
      email: email,
    });

    if (response.status === 200) {
      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Code valid. Please reset your password.",
        autoClose: "3000",
      });

      setStep("password");
    }

    setIsLoading(false);
  } catch (error) {
    let message = error.message;

    if (error.data && error.data.message) {
      message = error.data.message;
    }

    notifications.show({
      color: "red",
      title: "Error",
      message: message,
    });

    setIsLoading(false);
  }
};

export const ResetForgotPassword = async (
  emailForm,
  codeForm,
  newPasswordForm,
  new_password,
  setIsLoading,
  setStep,
  close
) => {
  try {
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
    let message = error.message;

    if (error.data && error.data.message) {
      message = error.data.message;
    }

    notifications.show({
      color: "red",
      title: "Error",
      message: message,
    });

    setIsLoading(false);
  }
};
