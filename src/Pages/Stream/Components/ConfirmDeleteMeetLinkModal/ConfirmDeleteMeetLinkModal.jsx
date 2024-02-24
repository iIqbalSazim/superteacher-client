import { useDispatch } from "react-redux";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { updateClassroom } from "@/Stores/Actions/Classroom";

import { updateClassroomApi } from "../../Api/StreamMethods";

const ConfirmDeleteMeetLinkModal = ({
  open,
  close,
  classroom,
  setClassroom,
}) => {
  const dispatch = useDispatch();

  const confirmDelete = async () => {
    try {
      const response = await updateClassroomApi(classroom.id, {
        classroom: { ...classroom, meet_link: "" },
      });

      const updatedClassroom = response.data.classroom;

      setClassroom(updatedClassroom);
      dispatch(updateClassroom(updatedClassroom));

      close();

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Meet link removed",
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
      <Box mx={{ base: "xs", sm: "md", md: "xl" }} py={"md"}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Are you sure you want to remove the meet link?
        </Text>
        <Group justify="flex-end" mt={"xl"} pt="md">
          <Button color="sazim-purple" onClick={close} size="sm">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="sazim-purple" size="sm">
            Confirm Remove
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteMeetLinkModal;
