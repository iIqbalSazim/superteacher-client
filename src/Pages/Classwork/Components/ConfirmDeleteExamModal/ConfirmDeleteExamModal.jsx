import { useState } from "react";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { deleteExam } from "../../Api/ClassworkMethods";

const ConfirmDeleteExamModal = ({ open, close, exam, setExams }) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmDelete = async () => {
    try {
      setIsLoading(true);

      await deleteExam(exam.classroom_id, exam.id);

      setExams((prevState) => prevState.filter((el) => el.id !== exam.id));

      notifications.show({
        color: "sazim-purple.5",
        title: "Success",
        message: "Exam deleted",
      });

      setIsLoading(false);
      close();
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
          Are you sure you want to delete the exam?
        </Text>
        <Group justify="flex-end" mt={"xl"} pt="md">
          <Button color="sazim-purple" onClick={close} size="sm">
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="sazim-purple"
            size="sm"
            loading={isLoading}
          >
            Confirm Delete
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteExamModal;
