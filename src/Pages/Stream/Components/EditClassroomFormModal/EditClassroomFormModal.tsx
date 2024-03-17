import { useContext } from "react";
import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  TextInput,
  Select,
  MultiSelect,
  TimeInput,
} from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Subjects, DaysOfTheWeek } from "@/Data/FormData";
import { updateClassroom } from "@/Stores/Slices/ClassroomSlice";
import { useAppDispatch } from "@/Stores/Store";
import CreateClassroomFormSchema from "@/Shared/Validation/CreateClassroomFormSchema";
import { ClassroomFormValues } from "@/Types/SharedTypes";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassroomContext } from "@/Providers/ClassroomProvider/ClassroomProvider";

import { updateClassroomApi } from "../../Api/StreamMethods";
import { EditClassroomParams } from "./EditClassroomFormTypes";

const EditClassroomFormModal: React.FC<EditClassroomParams> = ({
  open,
  close,
  classroom,
}) => {
  const { setClassroom } = useContext(ClassroomContext);

  const {
    formState: { errors },
    control,
  } = useForm<ClassroomFormValues>({
    defaultValues: {
      title: classroom.title,
      subject: classroom.subject,
      class_time: new Date(classroom.class_time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      days: classroom.days,
    },
    resolver: zodResolver(CreateClassroomFormSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: FormSubmitHandler<ClassroomFormValues> = async (
    formPayload
  ) => {
    try {
      const values = formPayload.data;

      const response = await updateClassroomApi(classroom.id, {
        title: values.title,
        subject: values.subject,
        class_time: values.class_time,
        days: values.days,
      });

      const updatedClassroom = response.data.classroom;

      setClassroom(updatedClassroom);
      dispatch(updateClassroom(updatedClassroom));

      close();

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Successfully updated classroom",
        autoClose: 3000,
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx={{ base: "xs", sm: "lg" }}>
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Edit Classroom
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
              data={DaysOfTheWeek}
              control={control}
              name="days"
              error={errors.days?.message}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="xl" mb={"sm"}>
            <Button size="sm" color="sazim-green.7" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" size="sm" color="sazim-green.7">
              Update
            </Button>
          </Group>
        </Form>
      </Box>
    </Modal>
  );
};

export default EditClassroomFormModal;
