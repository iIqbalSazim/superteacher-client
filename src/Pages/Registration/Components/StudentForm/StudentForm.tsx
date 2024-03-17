import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Group, Box, Flex, Text, Grid, Anchor } from "@mantine/core";
import { TextInput, Select, PasswordInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { setUser } from "@/Stores/Slices/AuthSlice";
import {
  handleEducationLevelChange,
  handleErrorMessage,
} from "@/Shared/SharedHelpers";

import { generateToken } from "../../../Login/Api/LoginMethods";
import { createNewUser } from "../../Api/RegistrationMethods";
import StudentFormSchema from "../../Validation/StudentFormSchema";
import { StudentFormValues } from "./StudentFormTypes";

const StudentForm: React.FC = () => {
  const {
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<StudentFormValues>({
    defaultValues: {
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
    resolver: zodResolver(StudentFormSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: FormSubmitHandler<StudentFormValues> = async (
    formPayload
  ) => {
    try {
      const values = formPayload.data;

      const response = await createNewUser({
        user: {
          email: values.email,
          password: values.password,
          gender: values.gender,
          first_name: values.first_name,
          last_name: values.last_name,
          address: values.address,
          phone_number: values.phone_number,
          education: values.education,
          role: "student",
        },
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

      reset();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const renderAdditionalFields = () => {
    const { level } = watch("education");

    if (level === "School") {
      return (
        <>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="English/Bangla Medium"
              placeholder="Select medium"
              withAsterisk
              data={["English", "Bangla"]}
              control={control}
              name="education.english_bangla_medium"
              error={errors.education?.english_bangla_medium?.message}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="Class"
              placeholder="Select class"
              withAsterisk
              data={["Class 7", "Class 8", "Class 9", "Class 10"]}
              control={control}
              name="education.class_level"
              error={errors.education?.class_level?.message}
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
              data={["English", "Bangla"]}
              control={control}
              name="education.english_bangla_medium"
              error={errors.education?.english_bangla_medium?.message}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="md"
              label="Class"
              placeholder="Select class"
              withAsterisk
              data={["Class 11", "Class 12"]}
              control={control}
              name="education.class_level"
              error={errors.education?.class_level?.message}
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
              data={["Bachelors", "Masters"]}
              control={control}
              name="education.degree_level"
              error={errors.education?.degree_level?.message}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size={"md"}
              label="Semester/Year"
              placeholder="Enter semester or year"
              withAsterisk
              control={control}
              name="education.semester_year"
              error={errors.education?.semester_year?.message}
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
        <Form control={control} onSubmit={onSubmit}>
          <Grid gutter={"md"} grow>
            <Grid.Col span={{ xs: 6, md: 4 }}>
              <TextInput
                size={"md"}
                label="First name"
                placeholder="Enter your first name"
                withAsterisk
                control={control}
                name="first_name"
                error={errors.first_name?.message}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 6, md: 4 }}>
              <TextInput
                size={"md"}
                label="Last name"
                placeholder="Enter your last name"
                withAsterisk
                control={control}
                name="last_name"
                error={errors.last_name?.message}
              />
            </Grid.Col>

            <Grid.Col span={{ md: 4 }}>
              <Select
                size="md"
                label="Gender"
                placeholder="Select your gender"
                withAsterisk
                data={["Male", "Female"]}
                control={control}
                name="gender"
                error={errors.gender?.message}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 7 }}>
              <TextInput
                size={"md"}
                label="Address"
                placeholder="Enter your address"
                withAsterisk
                control={control}
                name="address"
                error={errors.address?.message}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 5 }}>
              <TextInput
                size={"md"}
                label="Phone number"
                placeholder="Enter your phone number"
                withAsterisk
                control={control}
                name="phone_number"
                error={errors.phone_number?.message}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 4 }}>
              <Select
                size="md"
                placeholder="Select your education level"
                label="Education level"
                withAsterisk
                data={["School", "College", "University"]}
                control={control}
                name="education.level"
                error={errors.education?.level?.message}
                onOptionSubmit={(value) => {
                  const updates = handleEducationLevelChange(value);

                  setValue("education", updates);
                }}
              />
            </Grid.Col>

            {renderAdditionalFields()}

            <Grid.Col span={12}>
              <TextInput
                size={"md"}
                label="Email"
                placeholder="Enter your email"
                withAsterisk
                control={control}
                name="email"
                error={errors.email?.message}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 6 }}>
              <PasswordInput
                size="md"
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                control={control}
                name="password"
                error={errors.password?.message}
              />
            </Grid.Col>

            <Grid.Col span={{ xs: 6 }}>
              <PasswordInput
                size="md"
                label="Confirm Password"
                placeholder="Confirm password"
                withAsterisk
                control={control}
                name="confirm_password"
                error={errors.confirm_password?.message}
              />
            </Grid.Col>
          </Grid>

          <Group justify="space-evenly" mt="lg" pt={"sm"}>
            <Button size="md" color="sazim-purple.6" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit" size="md" color="sazim-green.7">
              Submit
            </Button>
          </Group>
        </Form>

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
