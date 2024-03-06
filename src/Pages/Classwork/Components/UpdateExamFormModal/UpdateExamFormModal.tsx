import { useContext, useState } from "react";
import {
  Box,
  Button,
  Group,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Providers/ClassworkProvider/ClassworkProvider";

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

  const form = useForm({
    initialValues: {
      title: exam.title,
      description: exam.description,
      date: new Date(exam.date),
    },
    validate: yupResolver(UpdateExamFormSchema),
  });

  const handleSubmit = async (values: UpdateExamFormValues) => {
    try {
      setIsLoading(true);

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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid>
            <TextInput
              size={"md"}
              label="Title"
              placeholder="Enter a title"
              {...form.getInputProps("title")}
            />
            <Textarea
              size={"md"}
              label="Instructions"
              placeholder="Enter instructions"
              {...form.getInputProps("description")}
            />
            <DateInput
              minDate={new Date()}
              size="md"
              label="Date"
              {...form.getInputProps("date")}
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
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateExamFormModal;
