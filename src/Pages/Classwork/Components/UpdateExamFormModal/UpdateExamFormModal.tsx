import { useContext, useState } from "react";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import { TextInput, Textarea, DateInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Shared/Providers/ClassworkProvider/ClassworkProvider";

import UpdateExamFormSchema from "../../Validation/UpdateExamFormSchema";
import { updateExam } from "../../Api/ClassworkMethods";
import {
  UpdateExamFormModalProps,
  UpdateExamFormValues,
} from "./UpdateExamFormModalTypes";

const UpdateExamFormModal: React.FC<UpdateExamFormModalProps> = ({
  open,
  close,
  exam,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setExams } = useContext(ClassworkContext);

  const {
    formState: { errors },
    control,
  } = useForm<UpdateExamFormValues>({
    defaultValues: {
      title: exam.title,
      description: exam.description,
      date: new Date(exam.date),
    },
    resolver: zodResolver(UpdateExamFormSchema),
  });

  const onSubmit: FormSubmitHandler<UpdateExamFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

      const response = await updateExam(exam.classroom_id, exam.id, {
        exam: {
          title: values.title,
          description: values.description,
          date: values.date,
        },
      });

      const updatedExam = response.data.exam;

      setExams((prevState) => {
        return prevState.map((exam) => {
          if (exam.id === updatedExam.id) {
            return updatedExam;
          } else {
            return exam;
          }
        });
      });

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Successfully updated exam",
        autoClose: 3000,
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
          Update Exam Details
        </Text>
        <Form control={control} onSubmit={onSubmit}>
          <SimpleGrid>
            <TextInput
              size={"md"}
              label="Title"
              placeholder="Enter a title"
              control={control}
              name="title"
              error={errors.title?.message}
            />
            <Textarea
              size={"md"}
              label="Instructions"
              placeholder="Enter instructions"
              control={control}
              name="description"
              error={errors.description?.message}
            />

            <DateInput
              minDate={new Date()}
              size="md"
              label="Date"
              control={control}
              name="date"
              error={errors.date?.message}
            />
          </SimpleGrid>

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
              Update
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default UpdateExamFormModal;
