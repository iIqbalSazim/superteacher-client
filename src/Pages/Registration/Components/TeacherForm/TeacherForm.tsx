import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, yupResolver } from "@mantine/form";
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
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { setUser } from "@/Stores/Slices/AuthSlice";
import { Subjects } from "@/Data/FormData";

import { generateToken } from "../../../Login/Api/LoginMethods";
import { createNewUser } from "../../Api/RegistrationMethods";
import TeacherFormSchema from "../../Validation/TeacherFormSchema";
import { TeacherFormApiError, TeacherFormValues } from "./TeacherFormTypes";

const TeacherForm: React.FC = () => {
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);

  const form = useForm<TeacherFormValues>({
    initialValues: {
      code: "",
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

  const handleSubmit = async (values: TeacherFormValues) => {
    try {
      const response = await createNewUser({
        email: values.email,
        password: values.password,
        code: values.code,
        gender: values.gender,
        first_name: values.first_name,
        last_name: values.last_name,
        major_subject: values.major_subject,
        highest_education_level: values.highest_education_level,
        subjects_to_teach: values.subjects_to_teach,
        role: "teacher",
      });

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
        message: "Registered successfully",
        autoClose: 3000,
      });

      form.reset();
    } catch (error) {
      const apiError = error as TeacherFormApiError;

      let { attempts_remaining } = apiError.data;
      setAttemptsRemaining(attempts_remaining);

      handleErrorMessage(apiError);
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
        Register as a Teacher
      </Text>
      <Box maw={700}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={"md"} grow>
            <Grid.Col>
              <TextInput
                size={"md"}
                label="Enter registration code"
                placeholder="Enter unique code, e.g. ceb486"
                withAsterisk
                {...form.getInputProps("code")}
              />
              {attemptsRemaining && attemptsRemaining > 0 ? (
                <Text size="xs" style={{ color: "white", marginTop: "4px" }}>
                  Attempts remaining: {attemptsRemaining}
                </Text>
              ) : attemptsRemaining === 0 ? (
                <Text size="xs" style={{ color: "gray", marginTop: "4px" }}>
                  No attempts remaining
                </Text>
              ) : null}
            </Grid.Col>

            <Grid.Col span={{ xs: 6, md: 4 }}>
              <TextInput
                size={"md"}
                label="First name"
                placeholder="Enter your first name"
                withAsterisk
                {...form.getInputProps("first_name")}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 6, md: 4 }}>
              <TextInput
                size={"md"}
                label="Last name"
                placeholder="Enter your last name"
                withAsterisk
                {...form.getInputProps("last_name")}
              />
            </Grid.Col>

            <Grid.Col span={{ md: 4 }}>
              <Select
                size="md"
                label="Gender"
                placeholder="Select your gender"
                withAsterisk
                {...form.getInputProps("gender")}
                data={["Male", "Female"]}
              />
            </Grid.Col>

            <Grid.Col span={{ sm: 8 }}>
              <TextInput
                size={"md"}
                label="Major Subject"
                placeholder="Enter your field of specialization"
                withAsterisk
                {...form.getInputProps("major_subject")}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 4 }}>
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

            <Grid.Col span={{ xs: 6 }}>
              <PasswordInput
                size="md"
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                {...form.getInputProps("password")}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 6 }}>
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

        <Text fw={400} c={"sazim-green.4"} ta={"center"} size="md">
          <Anchor component={Link} to={"/"} c="white">
            Register
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};

export default TeacherForm;
