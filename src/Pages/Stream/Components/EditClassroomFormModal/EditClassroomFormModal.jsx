import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Group,
  Modal,
  MultiSelect,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { TimeInput } from "@mantine/dates";

import { Subjects, DaysOfTheWeek } from "@/Data/FormData";
import { updateClassroom } from "@/Stores/Actions/Classroom";
import CreateClassroomFormSchema from "@/Shared/Validation/CreateClassroomFormSchema";

import { updateClassroomApi } from "../../Api/StreamMethods";

const EditClassroomFormModal = ({ open, close, classroom, setClassroom }) => {
  const form = useForm({
    initialValues: {
      title: classroom.title,
      subject: classroom.subject,
      class_time: new Date(classroom.class_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      days: classroom.days,
    },
    validate: yupResolver(CreateClassroomFormSchema),
  });

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const response = await updateClassroomApi(classroom.id, {
        classroom: { ...values },
      });

      const updatedClassroom = response.data.classroom;

      setClassroom(updatedClassroom);
      dispatch(updateClassroom(updatedClassroom));

      close();

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Successfully updated classroom",
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
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "lg" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Edit Classroom
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid>
            <TextInput
              size="sm"
              label="Title"
              placeholder="Enter a title"
              withAsterisk
              {...form.getInputProps("title")}
            />

            <Select
              size="sm"
              label="Subject"
              placeholder="Pick a subject"
              withAsterisk
              data={Subjects}
              {...form.getInputProps("subject")}
            />

            <TimeInput
              size="sm"
              label="Class Time"
              withAsterisk
              {...form.getInputProps("class_time")}
            />

            <MultiSelect
              size="sm"
              label="Days Of The Week"
              placeholder="Pick your preferred days"
              withAsterisk
              searchable
              data={DaysOfTheWeek}
              {...form.getInputProps("days")}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xl" mb={"sm"}>
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" size="sm" color="sazim-green.7">
              Update
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default EditClassroomFormModal;
