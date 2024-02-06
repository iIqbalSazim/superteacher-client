import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { notifications } from "@mantine/notifications";

import { updateUser } from "@/Stores/Actions/Auth";

import { updateUserProfile } from "../../Api/ProfileMethods";
import StudentUpdateProfileFormSchema from "../../Validation/StudentUpdateProfileFormSchema";

const StudentUpdateProfileForm = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: currentUser.email,
      gender: currentUser.gender,
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      address: currentUser.profile.address,
      phone_number: currentUser.phone_number,
      education: currentUser.profile.education,
    },
    validate: yupResolver(StudentUpdateProfileFormSchema),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await updateUserProfile(currentUser.id, values);

      const { user } = response.data;

      dispatch(
        updateUser({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          phone_number: user.phone_number,
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
          <Grid.Col span={{ xs: 6 }}>
            <Select
              size="lg"
              label="English/Bangla Medium"
              placeholder="Select medium"
              withAsterisk
              {...form.getInputProps("education.english_bangla_medium")}
              data={["English", "Bangla"]}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 6 }}>
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
          <Grid.Col span={{ xs: 6 }}>
            <Select
              size="lg"
              label="English/Bangla Medium"
              placeholder="Select medium"
              withAsterisk
              {...form.getInputProps("education.english_bangla_medium")}
              data={["English", "Bangla"]}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 6 }}>
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
          <Grid.Col span={{ xs: 6 }}>
            <Select
              size="lg"
              label="Bachelors/Masters"
              placeholder="Select degree level"
              withAsterisk
              {...form.getInputProps("education.degree_level")}
              data={["Bachelors", "Masters"]}
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 6 }}>
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
            label="Address"
            placeholder="Enter your address"
            withAsterisk
            {...form.getInputProps("address")}
          />
        </Grid.Col>

        <Grid.Col span={{ xs: 6 }}>
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

        <Grid.Col span={{ xs: 6 }}>
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
