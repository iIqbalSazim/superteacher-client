import { Link, useNavigate } from "react-router-dom";
import {
  Anchor,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";

import { useAppDispatch } from "@/Stores/Store";

import LoginFormSchema from "../../Validation/LoginFormSchema";
import { LoginUserAndGenerateToken } from "../../LoginHelpers";
import { LoginFormProps, LoginFormValues } from "./LoginFormTypes";

const LoginForm: React.FC<LoginFormProps> = ({ openForgotPasswordModal }) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(LoginFormSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    await LoginUserAndGenerateToken(values, form, dispatch, navigate);
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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter="xl">
            <Grid.Col span={12}>
              <TextInput
                size="md"
                label="Email"
                placeholder="Enter your email"
                withAsterisk
                {...form.getInputProps("email")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <PasswordInput
                size="md"
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                {...form.getInputProps("password")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="space-evenly" my="md" pt="md">
            <Button type="submit" size="md" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </form>

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
