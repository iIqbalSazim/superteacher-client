import { useState } from "react";
import { Box, Modal, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";

import CodeForm from "../CodeForm/CodeForm";
import NewPasswordForm from "../NewPasswordForm/NewPasswordForm";
import EmailForm from "../EmailForm/EmailForm";
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
    await GenerateResetToken(values.email, setStep, setIsLoading);
  };

  const handleSubmitCode = async (values) => {
    await ValidateResetToken(
      values.code,
      emailForm.values.email,
      setStep,
      setIsLoading
    );
  };

  const handleSubmitNewPassword = async (values) => {
    await ResetForgotPassword(
      emailForm,
      codeForm,
      newPasswordForm,
      values.new_password,
      setIsLoading,
      setStep,
      close
    );
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
