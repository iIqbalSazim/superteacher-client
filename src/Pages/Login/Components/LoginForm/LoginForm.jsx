import { Link } from "react-router-dom";
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

import { loginUser } from "../../Api/LoginMethods";

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    const response = await loginUser({ ...values });

    if (response) {
      console.log(response);
    }

    form.reset();
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Text my={20} fw={700} tt={"uppercase"} size="xl">
        Login
      </Text>
      <Box maw={700} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={"xl"}>
            <Grid.Col span={12}>
              <TextInput
                size={"lg"}
                label="Email"
                placeholder="Enter your email"
                withAsterisk
                {...form.getInputProps("email")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <PasswordInput
                size="lg"
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                {...form.getInputProps("password")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="space-evenly" mt="xl" pt={"md"}>
            <Button type="submit" size="lg" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </form>

        <Text fw={400} c={"sazim-green.4"} ta={"center"} size="lg" mt={"xl"}>
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
