import { useContext, useState } from "react";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import { TextInput, Textarea, DateInput } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Shared/Providers/ClassworkProvider/ClassworkProvider";

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

  const {
    formState: { errors },
    reset,
    control,
  } = useForm<ScheduleExamFormValues>({
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
    },
    resolver: zodResolver(ScheduleExamFormSchema),
  });

  const onSubmit: FormSubmitHandler<ScheduleExamFormValues> = async (
    formPayload
  ) => {
    try {
      setIsLoading(true);

      const values = formPayload.data;

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
      reset();
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
              Schedule
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default ScheduleExamFormModal;
