import { Button, Grid, Group } from "@mantine/core";
import { MultiSelect, TextInput, Select } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const {
    formState: { errors },
    control,
    reset,
  } = useForm<TeacherProfileFormValues>({
    defaultValues: {
      email: currentUser.email,
      gender: currentUser.gender,
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      major_subject: profile.major_subject,
      highest_education_level: profile.highest_education_level,
      subjects_to_teach: profile.subjects_to_teach,
    },
    resolver: zodResolver(TeacherUpdateProfileFormSchema),
  });

  const onSubmit: FormSubmitHandler<TeacherProfileFormValues> = async (
    formPayload
  ) => {
    try {
      const values = formPayload.data;

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
    <Form onSubmit={onSubmit} control={control}>
      <Grid gutter={"sm"} grow mx={"lg"} px={"lg"}>
        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            disabled
            size={"lg"}
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            control={control}
            name="email"
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <Select
            size="lg"
            label="Gender"
            placeholder="Select your gender"
            withAsterisk
            data={["Male", "Female"]}
            control={control}
            name="gender"
            error={errors.gender?.message}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            size={"lg"}
            label="First name"
            placeholder="Enter your first name"
            withAsterisk
            control={control}
            name="first_name"
            error={errors.first_name?.message}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            size={"lg"}
            label="Last name"
            placeholder="Enter your last name"
            withAsterisk
            control={control}
            name="last_name"
            error={errors.last_name?.message}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            size={"lg"}
            label="Major Subject"
            placeholder="Enter your field of specialization"
            withAsterisk
            control={control}
            name="major_subject"
            error={errors.major_subject?.message}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <Select
            size={"lg"}
            label="Highest Education Level"
            placeholder="Select education level"
            withAsterisk
            data={["Bachelors", "Masters", "Diploma", "PhD"]}
            control={control}
            name="highest_education_level"
            error={errors.highest_education_level?.message}
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
            control={control}
            name="subjects_to_teach"
            error={errors.subjects_to_teach?.message}
          />
        </Grid.Col>
      </Grid>

      <Group justify="space-evenly" mt="lg" pt={"sm"}>
        <Button size="md" color="sazim-purple.6" onClick={() => reset()}>
          Revert
        </Button>
        <Button type="submit" size="md" color="sazim-green.7">
          Submit
        </Button>
      </Group>
    </Form>
  );
};

export default TeacherUpdateProfileForm;
