import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { notifications } from "@mantine/notifications";

import { setUser } from "@/Stores/Actions/Auth";

import { generateToken, loginUser } from "../../Api/LoginMethods";
import LoginFormSchema from "../../Validation/LoginFormSchema";

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(LoginFormSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser({ ...values });

      const newUser = response.data.user;

      const tokenRequest = await generateToken({
        grant_type: "password",
        email: values.email,
        password: values.password,
      });

      const token = tokenRequest.data.access_token;

      dispatch(setUser(newUser));

      localStorage.setItem("token", token);

      navigate("/dashboard");

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Logged in successfully",
        autoClose: 3000,
      });

      form.reset();
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
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
      m={"lg"}
    >
      <Text my={20} fw={700} tt={"uppercase"} size="xl">
        Login
      </Text>
      <Box maw={700} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={"xl"}>
            <Grid.Col span={12}>
              <TextInput
                size={"md"}
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

          <Group justify="space-evenly" mt="xl" pt={"md"}>
            <Button type="submit" size="md" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </form>

        <Text fw={400} c={"sazim-green.4"} ta={"center"} size="md" mt={"xl"}>
          Don&apos;t have an account?{" "}
          <Anchor component={Link} to={"/"} c="white">
            Register
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginForm;
