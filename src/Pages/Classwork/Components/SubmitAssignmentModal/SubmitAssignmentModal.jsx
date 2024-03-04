import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, FileInput, Group, Modal, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { createNewSubmission } from "../../Api/ClassworkMethods";
import { formatDate, handleFileUpload } from "../../ClassworkHelpers";
import SubmitAssignmentSchema from "../../Validation/SubmitAssignmentFormSchema";

const SubmitAssignmentModal = ({
  open,
  close,
  resource,
  setUploadedAssignments,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const form = useForm({
    initialValues: {
      file: null,
    },
    validate: yupResolver(SubmitAssignmentSchema),
  });

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { file } = values;

      const downloadURL = await handleFileUpload(file);

      const newAssignmentSubmission = {
        assignment_id: resource.assignment_id,
        student_id: currentUser.id,
        submitted_on: formatDate(Date.now()),
        url: downloadURL,
      };

      const response = await createNewSubmission(
        resource.classroom_id,
        resource.assignment_id,
        {
          submission: { ...newAssignmentSubmission },
        }
      );

      setUploadedAssignments((prevState) => {
        return prevState.map((assignment) => {
          if (assignment.id === resource.id) {
            return {
              ...assignment,
              submissions: [
                ...assignment.submissions,
                response.data.submission,
              ],
            };
          }
          return assignment;
        });
      });

      setIsLoading(false);
      close();
    } catch (error) {
      handleErrorMessage(error);

      setIsLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Submit Assignment
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <FileInput
            clearable
            size="md"
            label="Upload file"
            placeholder="Upload file"
            {...form.getInputProps("file")}
          />

          <Group justify="flex-end" mt="xl" mb={"sm"}>
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              color="sazim-green.7"
              loading={isLoading}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default SubmitAssignmentModal;
