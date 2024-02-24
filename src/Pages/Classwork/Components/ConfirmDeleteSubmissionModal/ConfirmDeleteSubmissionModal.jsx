import { useState } from "react";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { deleteSubmission } from "../../Api/ClassworkMethods";

const ConfirmDeleteSubmissionModal = ({
  open,
  close,
  resource,
  submission,
  setUploadedAssignments,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmDelete = async () => {
    try {
      setIsLoading(true);

      const response = await deleteSubmission(
        resource.classroom_id,
        resource.assignment_id,
        submission.id
      );

      if (response.status === 200) {
        let submissionIdToRemove = response.data.id;

        setUploadedAssignments((prevState) => {
          return prevState.map((assignment) => {
            if (assignment.id === resource.id) {
              const updatedSubmissions = assignment.submissions.filter(
                (submission) => submission.id !== submissionIdToRemove
              );

              return {
                ...assignment,
                submissions: updatedSubmissions,
              };
            }
            return assignment;
          });
        });

        close();

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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
          Are you sure you want to delete your submission?
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

export default ConfirmDeleteSubmissionModal;
