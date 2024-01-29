import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { removeClassroom } from "@/Stores/Actions/Classroom";

import { deleteClassroom } from "../../Api/StreamMethods";

const ConfirmDeleteClassroomModal = ({
  open,
  close,
  classroomId,
  setClassroom,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDelete = async () => {
    try {
      const response = await deleteClassroom(classroomId);

      const id = response.data.deleted_classroom_id;

      dispatch(removeClassroom(id));

      setClassroom(null);

      notifications.show({
        color: "sazim-purple.5",
        title: "Success",
        message: "Classroom deleted",
      });

      navigate("/dashboard");
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
          Are you sure you want to delete the classroom?
        </Text>
        <Group justify="flex-end" mt={"xl"} pt="md">
          <Button color="sazim-purple" onClick={close} size="sm">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="sazim-purple" size="sm">
            Confirm Delete
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteClassroomModal;
