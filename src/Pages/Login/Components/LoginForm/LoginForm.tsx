import { Link, useNavigate } from "react-router-dom";
import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { TextInput, PasswordInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/Stores/Store";

import LoginFormSchema from "../../Validation/LoginFormSchema";
import { LoginUserAndGenerateToken } from "../../LoginHelpers";
import { LoginFormProps, LoginFormValues } from "./LoginFormTypes";

const LoginForm: React.FC<LoginFormProps> = ({ openForgotPasswordModal }) => {
  const {
    formState: { errors },
    control,
    reset,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: FormSubmitHandler<LoginFormValues> = async (formPayload) => {
    const values = formPayload.data;

    await LoginUserAndGenerateToken(values, reset, dispatch, navigate);
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
      m="lg"
    >
      <Text my={20} fw={700} tt="uppercase" size="xl">
        Login
      </Text>
      <Box maw={700} mx="auto">
        <Form control={control} onSubmit={onSubmit}>
          <SimpleGrid w={300}>
            <TextInput
              size="md"
              label="Email"
              placeholder="Enter your email"
              withAsterisk
              control={control}
              name="email"
              error={errors.email?.message}
            />

            <PasswordInput
              size="md"
              label="Password"
              placeholder="Enter your password"
              withAsterisk
              control={control}
              name="password"
              error={errors.password?.message}
            />
          </SimpleGrid>

          <Group justify="space-evenly" my="md" pt="md">
            <Button type="submit" size="md" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </Form>

        <Text fw={400} ta="center" my="xs" size="md">
          <Anchor onClick={openForgotPasswordModal} c="sazim-green.4">
            Forgot Password?
          </Anchor>
        </Text>

        <Text fw={400} c="sazim-green.4" ta="center" size="md" mt="xl">
          Don&apos;t have an account?{" "}
          <Anchor component={Link} to="/" c="white">
            Register
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginForm;
