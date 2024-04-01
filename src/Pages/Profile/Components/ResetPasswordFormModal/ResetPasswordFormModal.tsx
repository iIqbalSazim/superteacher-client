import { useState } from "react";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import { PasswordInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useResetPasswordMutation } from "@/Shared/Redux/Api/Password/password.api";

import ResetPasswordFormSchema from "../../Validation/ResetPasswordFormSchema";
import {
  ResetPasswordFormValues,
  ResetPasswordModalProps,
} from "./ResetPasswordFormModalTypes";

const ResetPasswordFormModal: React.FC<ResetPasswordModalProps> = ({
  open,
  close,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    reset,
    control,
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit: FormSubmitHandler<ResetPasswordFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

      const passwords = {
        old_password: values.old_password,
        new_password: values.new_password,
      };

      const response = await resetPassword(passwords).unwrap();

      if (response) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: "Password reset successful",
          autoClose: 3000,
        });

        setIsLoading(false);
        close();
        reset();
      }
    } catch (error) {
      handleErrorMessage(error);

      setIsLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Reset Password
        </Text>
        <Form control={control} onSubmit={onSubmit}>
          <SimpleGrid>
            <PasswordInput
              size="md"
              label="Old password"
              placeholder="Enter your old password"
              withAsterisk
              control={control}
              name="old_password"
              error={errors.old_password?.message}
            />

            <PasswordInput
              size="md"
              label="New Password"
              placeholder="Enter your new password"
              withAsterisk
              control={control}
              name="new_password"
              error={errors.new_password?.message}
            />

            <PasswordInput
              size="md"
              label="Confirm New Password"
              placeholder="Confirm new password"
              withAsterisk
              control={control}
              name="confirm_new_password"
              error={errors.confirm_new_password?.message}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xl" mb={"sm"}>
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              color="sazim-green.7"
              loading={isLoading}
            >
              Submit
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default ResetPasswordFormModal;
