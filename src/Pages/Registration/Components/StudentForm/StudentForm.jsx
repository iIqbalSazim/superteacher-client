import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  Select,
  NumberInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { setUser } from "@/Stores/Actions/Auth";

import { generateToken } from "../../../Login/Api/LoginMethods";
import { createNewUser } from "../../Api/RegistrationMethods";
import StudentFormSchema from "../../Validation/StudentFormSchema";

const StudentForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      education: {
        level: "",
        english_bangla_medium: "",
        class_level: "",
        degree_level: "",
        semester_year: "",
      },
      gender: "",
      phone_number: "",
      first_name: "",
      last_name: "",
    },
    validate: yupResolver(StudentFormSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await createNewUser({
        user: { ...values, role: "student" },
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

  const renderAdditionalFields = () => {
    const { level } = form.values.education;

    if (level === "School") {
      return (
        <>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="English/Bangla Medium"
              placeholder="Select medium"
              withAsterisk
              {...form.getInputProps("education.english_bangla_medium")}
              data={["English", "Bangla"]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="Class"
              placeholder="Select class"
              withAsterisk
              {...form.getInputProps("education.class_level")}
              data={["Class 7", "Class 8", "Class 9", "Class 10"]}
            />
          </Grid.Col>
        </>
      );
    }

    if (level === "College") {
      return (
        <>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="English/Bangla Medium"
              placeholder="Select medium"
              withAsterisk
              {...form.getInputProps("education.english_bangla_medium")}
              data={["English", "Bangla"]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="Class"
              placeholder="Select class"
              withAsterisk
              {...form.getInputProps("education.class_level")}
              data={["Class 11", "Class 12"]}
            />
          </Grid.Col>
        </>
      );
    }

    if (level === "University") {
      return (
        <>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="Bachelors/Masters"
              placeholder="Select degree level"
              withAsterisk
              {...form.getInputProps("education.degree_level")}
              data={["Bachelors", "Masters"]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size={"md"}
              label="Semester/Year"
              placeholder="Enter semester or year"
              withAsterisk
              {...form.getInputProps("education.semester_year")}
            />
          </Grid.Col>
        </>
      );
    }

    return null;
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
        Register as a Student
      </Text>
      <Box maw={700}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={"md"} grow>
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

            <Grid.Col span={{ xs: 7 }}>
              <TextInput
                size={"md"}
                label="Address"
                placeholder="Enter your address"
                withAsterisk
                {...form.getInputProps("address")}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 5 }}>
              <NumberInput
                leftSection={<Text>+880</Text>}
                allowNegative={false}
                size={"lg"}
                label="Phone number"
                placeholder="Enter your phone number"
                withAsterisk
                allowLeadingZeros
                {...form.getInputProps("phone_number")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 4 }}>
              <Select
                size="md"
                placeholder="Select your education level"
                label="Education level"
                withAsterisk
                {...form.getInputProps("education.level")}
                data={["School", "College", "University"]}
              />
            </Grid.Col>

            {renderAdditionalFields()}

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

export default StudentForm;
