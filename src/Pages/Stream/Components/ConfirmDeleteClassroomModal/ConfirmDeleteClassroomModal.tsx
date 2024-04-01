import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { removeClassroom } from "@/Shared/Redux/Slices/ClassroomSlice/ClassroomSlice";
import { ClassroomContext } from "@/Shared/Providers/ClassroomProvider/ClassroomProvider";

import { deleteClassroom } from "../../Api/StreamMethods";
import { ConfirmDeleteClassroomParams } from "./ConfirmDeleteClassroomTypes";

const ConfirmDeleteClassroomModal: React.FC<ConfirmDeleteClassroomParams> = ({
  open,
  close,
  classroomId,
}) => {
  const { setClassroom } = useContext(ClassroomContext);

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
      handleErrorMessage(error);
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
