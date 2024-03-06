import { useContext } from "react";
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

import { updateClassroom } from "@/Stores/Slices/ClassroomSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassroomContext } from "@/Providers/ClassroomProvider/ClassroomProvider";
import { useAppDispatch } from "@/Stores/Store";

import { updateClassroomApi } from "../../Api/StreamMethods";
import AddMeetLinkFormSchema from "../../Validation/AddMeetLinkFormSchema";
import {
  AddMeetLinkFormValues,
  AddMeetLinkModalProps,
} from "./AddMeetLinkTypes";

const AddMeetLinkFormModal: React.FC<AddMeetLinkModalProps> = ({
  open,
  close,
  classroom,
}) => {
  const { setClassroom } = useContext(ClassroomContext);

  let meet = classroom.meet_link ? classroom.meet_link : "";

  const form = useForm({
    initialValues: {
      meet_link: meet,
    },
    validate: yupResolver(AddMeetLinkFormSchema),
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: AddMeetLinkFormValues) => {
    try {
      const response = await updateClassroomApi(classroom.id, {
        ...classroom,
        meet_link: values.meet_link,
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
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Modal opened={open} onClose={close} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Add Meet Link
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid>
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
