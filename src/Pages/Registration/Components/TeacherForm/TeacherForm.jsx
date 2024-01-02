import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Flex,
  Text,
  Grid,
  Anchor,
  MultiSelect,
  Select,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";

import { loginSuccess } from "@/Stores/Actions/Auth";
import { Subjects } from "@/Data/FormData";

import { createNewUser } from "../../Api/RegistrationMethods";
import TeacherFormSchema from "../../Validation/TeacherFormSchema";

const TeacherForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      major_subject: "",
      highest_education_level: "",
      subjects_to_teach: [],
      gender: "",
      first_name: "",
      last_name: "",
    },
    validate: yupResolver(TeacherFormSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await createNewUser({
        user: { ...values, role: "teacher" },
      });
      console.log(response.data);

      const newUser = response.data.user;

      const token = response.data.token.access_token;

      dispatch(loginSuccess(newUser));

      localStorage.setItem("token", token);

      navigate("/dashboard");

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Registered successfully",
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
    >
      <Text my={20} fw={700} tt={"uppercase"} size="xl">
        Register as a Teacher
      </Text>
      <Box maw={700} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={"md"} grow>
            <Grid.Col span={4}>
              <TextInput
                size={"md"}
                label="First name"
                placeholder="Enter your first name"
                withAsterisk
                {...form.getInputProps("first_name")}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                size={"md"}
                label="Last name"
                placeholder="Enter your last name"
                withAsterisk
                {...form.getInputProps("last_name")}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <Select
                size="md"
                label="Gender"
                placeholder="Select your gender"
                withAsterisk
                {...form.getInputProps("gender")}
                data={["Male", "Female"]}
              />
            </Grid.Col>

            <Grid.Col span={8}>
              <TextInput
                size={"md"}
                label="Major Subject"
                placeholder="Enter your field of specialization"
                withAsterisk
                {...form.getInputProps("major_subject")}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <Select
                size="md"
                label="Highest Education Level"
                placeholder="Select education level"
                withAsterisk
                data={["Bachelors", "Masters", "Diploma", "PhD"]}
                {...form.getInputProps("highest_education_level")}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <MultiSelect
                size="md"
                label="Subjects to teach"
                placeholder="Pick your preferred subjects"
                withAsterisk
                searchable
                data={Subjects}
                {...form.getInputProps("subjects_to_teach")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                size={"md"}
                label="Email"
                placeholder="Enter your email"
                withAsterisk
                {...form.getInputProps("email")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <PasswordInput
                size="md"
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                {...form.getInputProps("password")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <PasswordInput
                size="md"
                label="Confirm Password"
                placeholder="Confirm password"
                withAsterisk
                {...form.getInputProps("confirm_password")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="space-evenly" mt="lg" pt={"sm"}>
            <Button
              size="md"
              color="sazim-purple.6"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" size="md" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </form>

        <Text fw={400} c={"sazim-green.4"} ta={"center"} size="md" mt={"lg"}>
          Already have an account?{" "}
          <Anchor component={Link} to={"/login"} c="white">
            Login
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};

export default TeacherForm;
