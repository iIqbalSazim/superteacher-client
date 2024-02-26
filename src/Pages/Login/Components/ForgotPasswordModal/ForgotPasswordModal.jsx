import { useState } from "react";
import { Box, Modal, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import {
  ForgotPasswordEmailSchema,
  ForgotPasswordCodeSchema,
  ForgotPasswordResetSchema,
} from "../../Validation/ForgotPasswordSchema";
import {
  generateResetToken,
  resetForgotPassword,
  validateResetToken,
} from "../../Api/LoginMethods";
import CodeForm from "../CodeForm/CodeForm";
import NewPasswordForm from "../NewPasswordForm/NewPasswordForm";
import EmailForm from "../EmailForm/EmailForm";

const ForgotPasswordModal = ({ open, close }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("email");

  const emailForm = useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(ForgotPasswordEmailSchema),
  });

  const codeForm = useForm({
    initialValues: {
      code: "",
    },
    validate: yupResolver(ForgotPasswordCodeSchema),
  });

  const newPasswordForm = useForm({
    initialValues: {
      new_password: "",
      confirm_new_password: "",
    },
    validate: yupResolver(ForgotPasswordResetSchema),
  });

  const handleSubmitEmail = async (values) => {
    try {
      setIsLoading(true);

      const response = await generateResetToken({
        email: values.email,
      });

      if (response.status === 200) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: `Email with a code was sent to ${values.email}`,
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

  const handleSubmitCode = async (values) => {
    try {
      setIsLoading(true);

      const response = await validateResetToken({
        token: values.code,
        email: emailForm.values.email,
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

  const handleSubmitNewPassword = async (values) => {
    try {
      setIsLoading(true);

      const response = await resetForgotPassword({
        password: {
          email: emailForm.values.email,
          new_password: values.new_password,
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

  const handleStepBack = () => {
    if (step === "code") setStep("email");
    else if (step === "password") setStep("code");
  };

  return (
    <Modal opened={open} onClose={close} size="md" centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt="uppercase" size="lg">
          Forgot Password
        </Text>

        {step === "email" && (
          <EmailForm
            form={emailForm}
            onSubmit={handleSubmitEmail}
            isLoading={isLoading}
            onCancel={close}
          />
        )}

        {step === "code" && (
          <CodeForm
            form={codeForm}
            onSubmit={handleSubmitCode}
            isLoading={isLoading}
            onBack={handleStepBack}
          />
        )}

        {step === "password" && (
          <NewPasswordForm
            form={newPasswordForm}
            onSubmit={handleSubmitNewPassword}
            isLoading={isLoading}
            onBack={handleStepBack}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ForgotPasswordModal;
