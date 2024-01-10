import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Group,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { updateClassroom } from "@/Stores/Actions/Classroom";

import { updateClassroomApi } from "../../Api/StreamMethods";
import AddMeetLinkFormSchema from "../../Validation/AddMeetLinkFormSchema";

const AddMeetLinkFormModal = ({ open, close, classroom, setClassroom }) => {
  const form = useForm({
    initialValues: {
      meet_link: classroom.meet_link || "",
    },
    validate: yupResolver(AddMeetLinkFormSchema),
  });

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const response = await updateClassroomApi(classroom.id, {
        classroom: { ...classroom, meet_link: values.meet_link },
      });

      const updatedClassroom = response.data.classroom;

      setClassroom(updatedClassroom);
      dispatch(updateClassroom(updatedClassroom));

      close();

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Meet link added",
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

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx="xl">
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Add Meet Link
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid gutter={"sm"}>
            <TextInput
              size="sm"
              label="Meet Link"
              placeholder="Enter a link"
              withAsterisk
              {...form.getInputProps("meet_link")}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xl" mb={"sm"}>
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" size="sm" color="sazim-green.7">
              Add
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMeetLinkFormModal;
