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
import { notifications } from "@mantine/notifications";
import { TextInput, PasswordInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/Shared/Redux/Store";
import {
  useGenerateTokenMutation,
  useLoginMutation,
} from "@/Shared/Redux/Api/Auth/auth.api";
import { setUser } from "@/Shared/Redux/Slices/AuthSlice/AuthSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import LoginFormSchema from "../../Validation/LoginFormSchema";
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

  const [login] = useLoginMutation();
  const [generateToken] = useGenerateTokenMutation();

  const onSubmit: FormSubmitHandler<LoginFormValues> = async (formPayload) => {
    try {
      const values = formPayload.data;

      const loginResult = await login(values).unwrap();

      const newUser = loginResult.user;

      const tokenResult = await generateToken({
        grant_type: "password",
        email: values.email,
        password: values.password,
      }).unwrap();

      const token = tokenResult.access_token;

      dispatch(setUser(newUser));

      localStorage.setItem("token", token);

      navigate("/dashboard");

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Logged in successfully",
        autoClose: 3000,
      });

      reset();
    } catch (error) {
      handleErrorMessage(error);
    }
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
