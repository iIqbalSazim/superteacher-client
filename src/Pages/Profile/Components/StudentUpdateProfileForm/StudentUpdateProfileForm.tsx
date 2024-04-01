import { Button, Grid, Group } from "@mantine/core";
import { TextInput, Select } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { updateUser } from "@/Shared/Redux/Slices/AuthSlice/AuthSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppDispatch, useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";

import { updateUserProfile } from "../../Api/ProfileMethods";
import StudentUpdateProfileFormSchema from "../../Validation/StudentUpdateProfileFormSchema";
import {
  StudentProfileFormValues,
  StudentProfileProps,
} from "./StudentUpdateProfileFormTypes";

const StudentUpdateProfileForm: React.FC<StudentProfileProps> = ({
  profile,
}) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;
  const userId = useAppSelector((state) => state.auth.user!.id) as number;

  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<StudentProfileFormValues>({
    defaultValues: {
      email: currentUser.email,
      gender: currentUser.gender,
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      address: profile.address,
      phone_number: currentUser.phone_number,
      education: profile.education,
    },
    resolver: zodResolver(StudentUpdateProfileFormSchema),
  });

  const onSubmit: FormSubmitHandler<StudentProfileFormValues> = async (
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
          phone_number: user.phone_number,
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

  const renderUniversityFields = () => {
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
  };

  const renderSchoolFields = () => {
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
  };

  const renderCollegeFields = () => {
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
            label="Address"
            placeholder="Enter your address"
            withAsterisk
            control={control}
            name="address"
            error={errors.address?.message}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
          <TextInput
            size={"lg"}
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
          />
        </Grid.Col>

        {watch("education.level") === "University"
          ? renderUniversityFields()
          : null}

        {watch("education.level") === "School" ? renderSchoolFields() : null}

        {watch("education.level") === "College" ? renderCollegeFields() : null}
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

export default StudentUpdateProfileForm;
