import { useContext } from "react";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { ClassroomContext } from "@/Providers/ClassroomProvider/ClassroomProvider";
import { updateClassroom } from "@/Stores/Slices/ClassroomSlice";
import { useAppDispatch } from "@/Stores/Store";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { updateClassroomApi } from "../../Api/StreamMethods";
import { ConfirmDeleteMeetLinkProps } from "./ConfirmDeleteMeetLinkTypes";

const ConfirmDeleteMeetLinkModal: React.FC<ConfirmDeleteMeetLinkProps> = ({
  open,
  close,
  classroom,
}) => {
  const { setClassroom } = useContext(ClassroomContext);
  const dispatch = useAppDispatch();

  const confirmDelete = async () => {
    try {
      const response = await updateClassroomApi(classroom.id, {
        ...classroom,
        meet_link: "",
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
      handleErrorMessage(error);
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
