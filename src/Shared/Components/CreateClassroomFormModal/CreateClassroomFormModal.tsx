import { useNavigate } from "react-router-dom";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import {
  TextInput,
  Select,
  MultiSelect,
  TimeInput,
} from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { createClassroom } from "@/Pages/Dashboard/Api/DashboardMethods";
import { updateClassrooms } from "@/Stores/Slices/ClassroomSlice";
import { Subjects, DaysOfTheWeekOptions } from "@/Data/FormData";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppDispatch, useAppSelector } from "@/Stores/Store";
import { ClassroomFormValues, User } from "@/Types/SharedTypes";
import { CreateClassroomFormModalProps } from "@/Shared/Components/CreateClassroomFormModal/CreateClassroomFormTypes";

import CreateClassroomFormSchema from "../../Validation/CreateClassroomFormSchema";

const CreateClassroomFormModal: React.FC<CreateClassroomFormModalProps> = ({
  open,
  close,
}) => {
  const {
    formState: { errors },
    reset,
    control,
  } = useForm<ClassroomFormValues>({
    defaultValues: {
      title: "",
      subject: "",
      class_time: "",
      days: [],
    },
    resolver: zodResolver(CreateClassroomFormSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const onSubmit: FormSubmitHandler<ClassroomFormValues> = async (
    formPayload
  ) => {
    try {
      const values = formPayload.data;

      console.log(values);
      return;

      const response = await createClassroom({
        classroom: {
          teacher_id: currentUser.id,
          title: values.title,
          subject: values.subject,
          class_time: values.class_time,
          days: values.days,
        },
      });

      const newClassroom = response.data.classroom;

      dispatch(updateClassrooms(newClassroom));

      close();

      navigate(`/classroom/${newClassroom.id}/stream`);

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Successfully added classroom",
        autoClose: 3000,
      });

      reset();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx="lg">
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Create a Classroom
        </Text>
        <Form control={control} onSubmit={onSubmit}>
          <SimpleGrid>
            <TextInput
              size="sm"
              label="Title"
              placeholder="Enter a title"
              withAsterisk
              control={control}
              name="title"
              error={errors.title?.message}
            />

            <Select
              size="sm"
              label="Subject"
              placeholder="Pick a subject"
              withAsterisk
              data={Subjects}
              control={control}
              name="subject"
              error={errors.subject?.message}
            />

            <TimeInput
              size="sm"
              label="Class Time"
              withAsterisk
              control={control}
              name="class_time"
              error={errors.class_time?.message}
            />

            <MultiSelect
              size="sm"
              label="Days Of The Week"
              placeholder="Pick your preferred days"
              withAsterisk
              searchable
              data={DaysOfTheWeekOptions}
              control={control}
              name="days"
              error={errors.days?.message}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xl" mb="sm">
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" size="sm" color="sazim-green.7">
              Create
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default CreateClassroomFormModal;
