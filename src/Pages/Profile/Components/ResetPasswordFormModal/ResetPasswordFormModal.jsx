import { useState } from "react";
import {
  Box,
  Button,
  Group,
  Modal,
  PasswordInput,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import ResetPasswordFormSchema from "../../Validation/ResetPasswordFormSchema";
import { resetPassword } from "../../Api/ProfileMethods";

const ResetPasswordFormModal = ({ open, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validate: yupResolver(ResetPasswordFormSchema),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const passwords = {
        password: {
          old_password: values.old_password,
          new_password: values.new_password,
        },
      };

      const response = await resetPassword(passwords);

      if (response.status === 200) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: "Password reset successful",
          autoClose: 3000,
        });

        setIsLoading(false);
        close();
        form.reset();
      }
    } catch (error) {
      let message;
      if (error.data) {
        message = error.data.message;
      } else {
        message = error.message;
      }

      if (message) {
        notifications.show({
          color: "red",
          title: "Error",
          message: message,
        });
      }

      setIsLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Reset Password
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid>
            <PasswordInput
              size="md"
              label="Old password"
              placeholder="Enter your old password"
              withAsterisk
              {...form.getInputProps("old_password")}
            />

            <PasswordInput
              size="md"
              label="New Password"
              placeholder="Enter your new password"
              withAsterisk
              {...form.getInputProps("new_password")}
            />

            <PasswordInput
              size="md"
              label="Confirm New Password"
              placeholder="Confirm new password"
              withAsterisk
              {...form.getInputProps("confirm_new_password")}
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
        </form>
      </Box>
    </Modal>
  );
};

export default ResetPasswordFormModal;
