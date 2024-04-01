import { useContext, useState } from "react";
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { FileInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppSelector } from "@/Shared/Redux/Store";
import { User } from "@/Types/SharedTypes";
import { ClassworkContext } from "@/Shared/Providers/ClassworkProvider/ClassworkProvider";

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

  const {
    formState: { errors },
    control,
  } = useForm<SubmitAssignmentFormValues>({
    defaultValues: {
      file: null,
    },
    resolver: zodResolver(SubmitAssignmentSchema),
  });

  const onSubmit: FormSubmitHandler<SubmitAssignmentFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

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
        <Form control={control} onSubmit={onSubmit}>
          <FileInput
            clearable
            size="md"
            label="Upload file"
            placeholder="Upload file"
            control={control}
            name="file"
            error={errors.file?.message}
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
        </Form>
      </Box>
    </Modal>
  );
};

export default SubmitAssignmentModal;
