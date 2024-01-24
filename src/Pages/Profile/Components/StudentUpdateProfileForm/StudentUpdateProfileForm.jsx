import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { notifications } from "@mantine/notifications";

import { updateStudentProfile } from "../../Api/ProfileMethods";
import StudentUpdateProfileFormSchema from "../../Validation/StudentUpdateProfileFormSchema";

const StudentUpdateProfileForm = ({ profile, setProfile }) => {
  const form = useForm({
    initialValues: {
      email: profile.student.email,
      gender: profile.student.gender,
      first_name: profile.student.first_name,
      last_name: profile.student.last_name,
      address: profile.address,
      phone_number: profile.student.phone_number,
      education: profile.education,
    },
    validate: yupResolver(StudentUpdateProfileFormSchema),
  });

  const handleSubmit = async (values) => {
    try {
      const studentProfile = {
        student_profile: values,
      };

      const response = await updateStudentProfile(
        profile.student.id,
        studentProfile
      );

      setProfile(response.data.profile);

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Profile updated successfully",
        autoClose: 3000,
      });
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
              size="lg"
              label="English/Bangla Medium"
              placeholder="Select medium"
              withAsterisk
              {...form.getInputProps("education.english_bangla_medium")}
              data={["English", "Bangla"]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="lg"
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
              size="lg"
              label="English/Bangla Medium"
              placeholder="Select medium"
              withAsterisk
              {...form.getInputProps("education.english_bangla_medium")}
              data={["English", "Bangla"]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              size="lg"
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
              size="lg"
              label="Bachelors/Masters"
              placeholder="Select degree level"
              withAsterisk
              {...form.getInputProps("education.degree_level")}
              data={["Bachelors", "Masters"]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size={"lg"}
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
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Grid gutter={"sm"} grow mx={"xl"} px={"lg"}>
        <Grid.Col span={6}>
          <TextInput
            size={"lg"}
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            {...form.getInputProps("email")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            size="lg"
            label="Gender"
            placeholder="Select your gender"
            withAsterisk
            {...form.getInputProps("gender")}
            data={["Male", "Female"]}
          />
        </Grid.Col>

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
          <TextInput
            size={"lg"}
            label="Address"
            placeholder="Enter your address"
            withAsterisk
            {...form.getInputProps("address")}
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

        <Grid.Col span={6}>
          <Select
            size="lg"
            placeholder="Select your education level"
            label="Education level"
            withAsterisk
            {...form.getInputProps("education.level")}
            data={["School", "College", "University"]}
          />
        </Grid.Col>

        {renderAdditionalFields()}
      </Grid>

      <Group justify="space-evenly" mt="lg" pt={"sm"}>
        <Button size="md" color="sazim-purple.6" onClick={() => form.reset()}>
          Revert
        </Button>
        <Button type="submit" size="md" color="sazim-green.7">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default StudentUpdateProfileForm;
