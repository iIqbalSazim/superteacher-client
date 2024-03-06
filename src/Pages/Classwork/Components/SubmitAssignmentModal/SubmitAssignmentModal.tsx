import { useContext, useState } from "react";
import { Box, Button, FileInput, Group, Modal, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";
import { ClassworkContext } from "@/Providers/ClassworkProvider/ClassworkProvider";

import { createNewSubmission } from "../../Api/ClassworkMethods";
import { formatDate, handleFileUpload } from "../../ClassworkHelpers";
import SubmitAssignmentSchema from "../../Validation/SubmitAssignmentFormSchema";
import { Submission } from "../../ClassworkTypes";
import {
  SubmitAssignmentFormValues,
  SubmitAssignmentModalProps,
} from "./SubmitAssignmentModalTypes";

const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  open,
  close,
  resource,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const { setUploadedAssignments } = useContext(ClassworkContext);

  const form = useForm({
    initialValues: {
      file: null,
    },
    validate: yupResolver(SubmitAssignmentSchema),
  });

  const handleSubmit = async (values: SubmitAssignmentFormValues) => {
    try {
      setIsLoading(true);

      if (values.file) {
        const { file } = values;

        const downloadURL: string = await handleFileUpload(file);

        const response = await createNewSubmission(
          resource.classroom_id,
          resource.assignment_id!,
          {
            submission: {
              assignment_id: resource.assignment_id as number,
              student_id: currentUser.id as number,
              submitted_on: formatDate(Date.now()),
              url: downloadURL,
            },
          }
        );

        setUploadedAssignments((prevState) => {
          return prevState.map((assignment) => {
            if (assignment.id === resource.id) {
              return {
                ...assignment,
                submissions: [
                  ...(assignment.submissions as Submission[]),
                  response.data.submission as Submission,
                ],
              };
            }
            return assignment;
          });
        });

        setIsLoading(false);
        close();
      }
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
