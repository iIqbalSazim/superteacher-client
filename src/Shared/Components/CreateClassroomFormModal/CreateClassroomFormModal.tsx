import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  MultiSelect,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconClock } from "@tabler/icons-react";

import { createClassroom } from "@/Pages/Dashboard/Api/DashboardMethods";
import { updateClassrooms } from "@/Stores/Slices/ClassroomSlice";
import { Subjects, DaysOfTheWeek } from "@/Data/FormData";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppDispatch, useAppSelector } from "@/Stores/Store";
import { ClassroomFormValues, User } from "@/Types/SharedTypes";
import { CreateClassroomFormModalProps } from "@/Shared/Components/CreateClassroomFormModal/CreateClassroomFormTypes";

import CreateClassroomFormSchema from "../../Validation/CreateClassroomFormSchema";

const CreateClassroomFormModal: React.FC<CreateClassroomFormModalProps> = ({
  open,
  close,
}) => {
  const form = useForm({
    initialValues: {
      title: "",
      subject: "",
      class_time: "",
      days: [],
    },
    validate: yupResolver(CreateClassroomFormSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const handleSubmit = async (values: ClassroomFormValues) => {
    try {
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

      form.reset();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock stroke={1.5} />
    </ActionIcon>
  );

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx="lg">
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Create a Classroom
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <SimpleGrid>
            <TextInput
              size="sm"
              label="Title"
              placeholder="Enter a title"
              withAsterisk
              {...form.getInputProps("title")}
            />

            <Select
              size="sm"
              label="Subject"
              placeholder="Pick a subject"
              withAsterisk
              data={Subjects}
              {...form.getInputProps("subject")}
            />

            <TimeInput
              size="sm"
              label="Class Time"
              withAsterisk
              ref={ref}
              rightSection={pickerControl}
              {...form.getInputProps("class_time")}
            />

            <MultiSelect
              size="sm"
              label="Days Of The Week"
              placeholder="Pick your preferred days"
              withAsterisk
              searchable
              data={DaysOfTheWeek}
              {...form.getInputProps("days")}
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
        </form>
      </Box>
    </Modal>
  );
};

export default CreateClassroomFormModal;
