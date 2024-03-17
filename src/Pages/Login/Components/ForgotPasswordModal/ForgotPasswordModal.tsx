import { useState } from "react";
import { Box, Modal, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ForgotPasswordEmailSchema,
  ForgotPasswordCodeSchema,
  ForgotPasswordResetSchema,
} from "../../Validation/ForgotPasswordSchema";
import {
  GenerateResetToken,
  ResetForgotPassword,
  ValidateResetToken,
} from "../../LoginHelpers";
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

  const handleSubmitEmail = async (data: { email: string }) => {
    const params = { ...data };
    await GenerateResetToken(params, setStep, setIsLoading);
  };

  const handleSubmitCode = async (data: { code: string }) => {
    const params = { code: data.code, email: emailForm.getValues("email") };
    await ValidateResetToken(params, setStep, setIsLoading);
  };

  const handleSubmitNewPassword = async () => {
    const params = {
      emailForm,
      codeForm,
      newPasswordForm,
    };

    await ResetForgotPassword(params, setStep, setIsLoading, close);
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
