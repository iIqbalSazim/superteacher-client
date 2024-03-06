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

import ScheduleExamFormSchema from "../../Validation/ScheduleExamFormSchema";
import { createNewExam } from "../../Api/ClassworkMethods";
import {
  ScheduleExamFormModalProps,
  ScheduleExamFormValues,
} from "./ScheduleExamFormModalTypes";

const ScheduleExamFormModal: React.FC<ScheduleExamFormModalProps> = ({
  open,
  close,
  classroom,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setExams } = useContext(ClassworkContext);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      date: new Date(),
    },
    validate: yupResolver(ScheduleExamFormSchema),
  });

  const handleSubmit = async (values: ScheduleExamFormValues) => {
    try {
      setIsLoading(true);

      const response = await createNewExam(classroom.id, {
        exam: {
          title: values.title,
          description: values.description,
          date: values.date,
          classroom_id: classroom.id,
        },
      });

      setExams((prevState) => [response.data.exam, ...prevState]);

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Successfully scheduled exam",
        autoClose: 3000,
      });

      setIsLoading(false);
      close();
      form.reset();
    } catch (error) {
      handleErrorMessage(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "xl" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Schedule Exam
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
              Schedule
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default ScheduleExamFormModal;
