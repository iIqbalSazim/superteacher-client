import { useState } from "react";
import { Box, Modal, Text } from "@mantine/core";
import { useForm, yupResolver, UseFormReturnType } from "@mantine/form";

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
import {
  ForgotPasswordModalProps,
  ForgotPasswordResetValues,
} from "./ForgotPasswordModalTypes";
import { EmailFormValues } from "../EmailForm/EmailFormTypes";
import { CodeFormValues } from "../CodeForm/CodeFormTypes";

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  open,
  close,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"email" | "code" | "password">("email");

  const emailForm: UseFormReturnType<EmailFormValues> = useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(ForgotPasswordEmailSchema),
  });

  const codeForm: UseFormReturnType<CodeFormValues> = useForm({
    initialValues: {
      code: "",
    },
    validate: yupResolver(ForgotPasswordCodeSchema),
  });

  const newPasswordForm: UseFormReturnType<ForgotPasswordResetValues> = useForm(
    {
      initialValues: {
        new_password: "",
        confirm_new_password: "",
      },
      validate: yupResolver(ForgotPasswordResetSchema),
    }
  );

  const handleSubmitEmail = async (values: { email: string }) => {
    const params = { ...values };

    await GenerateResetToken(params, setStep, setIsLoading);
  };

  const handleSubmitCode = async (values: { code: string }) => {
    const params = { code: values.code, email: emailForm.values.email };

    await ValidateResetToken(params, setStep, setIsLoading);
  };

  const handleSubmitNewPassword = async (values: {
    new_password: string;
    confirm_new_password: string;
  }) => {
    const params = {
      emailForm,
      codeForm,
      newPasswordForm,
      new_password: values.new_password,
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
