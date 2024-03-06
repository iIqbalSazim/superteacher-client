import {
  Button,
  Grid,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { Subjects } from "@/Data/FormData";
import { updateUser } from "@/Stores/Slices/AuthSlice";
import { User } from "@/Types/SharedTypes";
import { useAppDispatch, useAppSelector } from "@/Stores/Store";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { updateUserProfile } from "../../Api/ProfileMethods";
import TeacherUpdateProfileFormSchema from "../../Validation/TeacherUpdateProfileFormSchema";
import {
  TeacherProfileFormValues,
  TeacherProfileProps,
} from "./TeacherUpdateProfileFormTypes";

const TeacherUpdateProfileForm: React.FC<TeacherProfileProps> = ({
  profile,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;
  const userId = useAppSelector((state) => state.auth.user!.id) as number;

  const dispatch = useAppDispatch();

  const form = useForm<TeacherProfileFormValues>({
    validateInputOnChange: true,
    initialValues: {
      email: currentUser.email,
      gender: currentUser.gender,
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      major_subject: profile.major_subject,
      highest_education_level: profile.highest_education_level,
      subjects_to_teach: profile.subjects_to_teach,
    },
    validate: yupResolver(TeacherUpdateProfileFormSchema),
  });

  const handleSubmit = async (values: TeacherProfileFormValues) => {
    try {
      const response = await updateUserProfile(userId, values);

      const user = response.data.user as User;

      dispatch(
        updateUser({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          role: user.role,
          profile: user.profile,
        })
      );

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Profile updated successfully",
        autoClose: 3000,
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Grid gutter={"sm"} grow mx={"lg"} px={"lg"}>
        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            disabled
            size={"lg"}
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            {...form.getInputProps("email")}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <Select
            size="lg"
            label="Gender"
            placeholder="Select your gender"
            withAsterisk
            {...form.getInputProps("gender")}
            data={["Male", "Female"]}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            size={"lg"}
            label="First name"
            placeholder="Enter your first name"
            withAsterisk
            {...form.getInputProps("first_name")}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            size={"lg"}
            label="Last name"
            placeholder="Enter your last name"
            withAsterisk
            {...form.getInputProps("last_name")}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            size={"lg"}
            label="Major Subject"
            placeholder="Enter your field of specialization"
            withAsterisk
            {...form.getInputProps("major_subject")}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
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
