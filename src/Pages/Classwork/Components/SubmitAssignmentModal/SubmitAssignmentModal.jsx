import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, FileInput, Group, Modal, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { createNewSubmission, uploadFile } from "../../Api/ClassworkMethods";
import { formatDate } from "../../ClassworkHelpers";
import SubmitAssignmentSchema from "../../Validation/SubmitAssignmentFormSchema";

const SubmitAssignmentModal = ({ open, close, resource }) => {
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
      let formData = new FormData();
      formData.append("file", file);

      const res = await uploadFile(formData);

      const downloadURL = res.data.url;

      const newAssignment = {
        assignment_id: resource.assignment_id,
        student_id: currentUser.id,
        submitted_on: formatDate(Date.now()),
        url: downloadURL,
      };

      const response = await createNewSubmission(
        resource.classroom_id,
        resource.id,
        {
          submission: { ...newAssignment },
        }
      );

      if (response.data.submission) {
        setIsLoading(false);
        close();

        location.reload();
      }
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
