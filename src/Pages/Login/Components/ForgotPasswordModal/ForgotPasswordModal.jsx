import { useState } from "react";
import { Box, Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import ForgotPasswordSchema from "../../Validation/ForgotPasswordSchema";
import { forgotPassword } from "../../Api/LoginMethods";

const ForgotPasswordModal = ({ open, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(ForgotPasswordSchema),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const response = await forgotPassword({
        password: { email: values.email },
      });

      if (response.status === 200) {
        notifications.show({
          color: "sazim-green",
          title: "Success",
          message: `Email was sent to ${values.email}`,
        });

        close();
        setIsLoading(false);
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
          Forgot Password
        </Text>

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            size={"md"}
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            {...form.getInputProps("email")}
          />

          <Text fw={300} size="md" mt={20} mx={"sm"}>
            Enter the email address you logged in with. An email with
            instructions will be sent to you.
          </Text>

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

export default ForgotPasswordModal;
