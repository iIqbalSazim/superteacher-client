import {
  Button,
  Grid,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { notifications } from "@mantine/notifications";

import { Subjects } from "@/Data/FormData";

import { updateTeacherProfile } from "../../Api/ProfileMethods";
import TeacherUpdateProfileFormSchema from "../../Validation/TeacherUpdateProfileFormSchema";

const TeacherUpdateProfileForm = ({ profile, setProfile }) => {
  const form = useForm({
    initialValues: {
      email: profile.teacher.email,
      gender: profile.teacher.gender,
      first_name: profile.teacher.first_name,
      last_name: profile.teacher.last_name,
      major_subject: profile.major_subject,
      highest_education_level: profile.highest_education_level,
      subjects_to_teach: profile.subjects_to_teach,
    },
    validate: yupResolver(TeacherUpdateProfileFormSchema),
  });

  const handleSubmit = async (values) => {
    try {
      const teacherProfile = {
        teacher_profile: values,
      };
      const response = await updateTeacherProfile(
        profile.teacher.id,
        teacherProfile
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
            label="Major Subject"
            placeholder="Enter your field of specialization"
            withAsterisk
            {...form.getInputProps("major_subject")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            size={"lg"}
            label="Highest Education Level"
            placeholder="Select education level"
            withAsterisk
            data={["Bachelors", "Masters", "Diploma", "PhD"]}
            {...form.getInputProps("highest_education_level")}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <MultiSelect
            size={"lg"}
            label="Subjects to teach"
            placeholder="Pick your preferred subjects"
            withAsterisk
            searchable
            data={Subjects}
            {...form.getInputProps("subjects_to_teach")}
          />
        </Grid.Col>
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

export default TeacherUpdateProfileForm;
