import { useState } from "react";
import { Box, Modal, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import {
  useGenerateResetTokenMutation,
  useResetForgotPasswordMutation,
  useValidateResetTokenMutation,
} from "@/Shared/Redux/Api/Password/password.api";

import {
  ForgotPasswordEmailSchema,
  ForgotPasswordCodeSchema,
  ForgotPasswordResetSchema,
} from "../../Validation/ForgotPasswordSchema";
import CodeForm from "../CodeForm/CodeForm";
import NewPasswordForm from "../NewPasswordForm/NewPasswordForm";
import EmailForm from "../EmailForm/EmailForm";
import { ForgotPasswordModalProps } from "./ForgotPasswordModalTypes";

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  open,
  close,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"email" | "code" | "password">("email");

  const emailForm = useForm<{ email: string }>({
    resolver: zodResolver(ForgotPasswordEmailSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm<{ code: string }>({
    resolver: zodResolver(ForgotPasswordCodeSchema),
    defaultValues: { code: "" },
  });

  const newPasswordForm = useForm<{
    new_password: string;
    confirm_new_password: string;
  }>({
    resolver: zodResolver(ForgotPasswordResetSchema),
    defaultValues: {
      new_password: "",
      confirm_new_password: "",
    },
  });

  const [generateResetToken] = useGenerateResetTokenMutation();
  const [validateResetToken] = useValidateResetTokenMutation();
  const [resetForgotPassword] = useResetForgotPasswordMutation();

  const handleSubmitEmail = async (data: { email: string }) => {
    try {
      setIsLoading(true);

      const response = await generateResetToken({
        email: data.email,
      }).unwrap();

      if (response) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: `Email with a code was sent to ${data.email}`,
        });

        setStep("code");

        setIsLoading(false);
      }
    } catch (error) {
      handleErrorMessage(error);

      setIsLoading(false);
    }
  };

  const handleSubmitCode = async (data: { code: string }) => {
    try {
      setIsLoading(true);

      const response = await validateResetToken({
        token: data.code,
        email: emailForm.getValues("email"),
      });

      if (response) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: "Code valid. Please reset your password.",
          autoClose: 3000,
        });

        setStep("password");
        setIsLoading(false);
      }
    } catch (error) {
      handleErrorMessage(error);

      setIsLoading(false);
    }
  };

  const handleSubmitNewPassword = async (data: { new_password: string }) => {
    try {
      setIsLoading(true);

      const response = await resetForgotPassword({
        password: {
          email: emailForm.getValues("email"),
          new_password: data.new_password,
        },
        token: codeForm.getValues("code"),
      });

      if (response) {
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
        setIsLoading(false);
      }
    } catch (error) {
      handleErrorMessage(error);

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
