import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  NativeSelect,
  Flex,
  Text,
  Grid,
  Anchor,
} from "@mantine/core";

import { createNewUser } from "../../Api/RegistrationMethods";

const RegistrationForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      gender: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const handleSubmit = async (values) => {
    const response = await createNewUser({ ...values });

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
        Register
      </Text>
      <Box maw={700} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={"xl"}>
            <Grid.Col span={6}>
              <TextInput
                size={"lg"}
                label="First name"
                placeholder="Enter your first name"
                withAsterisk
                {...form.getInputProps("first_name")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                size={"lg"}
                label="Last name"
                placeholder="Enter your last name"
                withAsterisk
                {...form.getInputProps("last_name")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NativeSelect
                size="lg"
                label="Gender"
                value={"Male"}
                withAsterisk
                {...form.getInputProps("gender")}
                data={["Male", "Female", "Prefer not to say"]}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                size={"lg"}
                label="Phone number"
                placeholder="Enter your phone number"
                withAsterisk
                {...form.getInputProps("phone_number")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                size={"lg"}
                label="Email"
                placeholder="Enter your email"
                withAsterisk
                {...form.getInputProps("email")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <PasswordInput
                size="lg"
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                {...form.getInputProps("password")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                size="lg"
                label="Confirm Password"
                placeholder="Confirm password"
                withAsterisk
                {...form.getInputProps("confirm_password")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="space-evenly" mt="lg" pt={"md"}>
            <Button
              size="lg"
              color="sazim-purple.6"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" size="lg" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </form>

        <Text fw={400} c={"sazim-green.4"} ta={"center"} size="lg" mt={"xl"}>
          Already have an account?{" "}
          <Anchor component={Link} to={"/login"} c="white">
            Login
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegistrationForm;
