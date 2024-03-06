import { useContext, useState } from "react";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Providers/ClassworkProvider/ClassworkProvider";

import { deleteSubmission } from "../../Api/ClassworkMethods";
import { ConfirmDeleteSubmissionModalProps } from "./ConfirmDeleteSubmissionModalTypes";
import { Submission } from "../../ClassworkTypes";

const ConfirmDeleteSubmissionModal: React.FC<
  ConfirmDeleteSubmissionModalProps
> = ({ open, close, resource, submissionId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUploadedAssignments } = useContext(ClassworkContext);

  const confirmDelete = async () => {
    try {
      setIsLoading(true);

      const response = await deleteSubmission(
        resource.classroom_id,
        resource.assignment_id!,
        submissionId
      );

      if (response.status === 200) {
        let submissionIdToRemove = response.data.id;

        setUploadedAssignments((prevState) => {
          return prevState.map((assignment) => {
            if (assignment.id === resource.id) {
              const currentSubmissions = assignment.submissions as Submission[];

              const updatedSubmissions = currentSubmissions.filter(
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

        notifications.show({
          color: "sazim-purple.5",
          title: "Success",
          message: "Submission deleted",
        });

        setIsLoading(false);
      }
    } catch (error) {
      handleErrorMessage(error);
      setIsLoading(false);
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
