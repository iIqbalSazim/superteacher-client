import {
  Box,
  Button,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { enrollStudent } from "../../Api/PeopleMethods";
import {
  AddStudentFormValues,
  AddStudentModalProps,
} from "./AddStudentModalTypes";

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  open,
  close,
  classroom,
  students,
  notEnrolledStudents,
  setNotEnrolledStudents,
  setStudents,
}) => {
  const form = useForm({
    initialValues: {
      id: "",
    },
  });

  const handleSubmit = async (values: AddStudentFormValues) => {
    try {
      const response = await enrollStudent(classroom.id, {
        student_id: parseInt(values.id),
      });

      setStudents([...students, response.data.student]);
      setNotEnrolledStudents((prevNotEnrolledStudents) =>
        prevNotEnrolledStudents.filter(
          (student) => student.id !== response.data.student.id
        )
      );

      notifications.show({
        color: "sazim-green",
        title: "Success",
        message: "Student successfully enrolled",
      });

      close();

      form.reset();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Modal opened={open} onClose={close} size={"md"} centered>
      <Box mx="xl">
        <Text mb={20} fw={700} tt={"uppercase"} size="lg">
          Enroll a Student
        </Text>
        {notEnrolledStudents.length > 0 ? (
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <SimpleGrid>
              <Select
                label="Type a name"
                placeholder="Pick student"
                data={notEnrolledStudents.map((student) => ({
                  label: `${student.first_name} ${student.last_name}`,
                  value: String(student.id),
                }))}
                searchable
                {...form.getInputProps("id")}
              />
            </SimpleGrid>

            <Group justify="flex-end" mt="xl" mb={"sm"}>
              <Button size="sm" color="sazim-green.7" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" size="sm" color="sazim-green.7">
                Enroll
              </Button>
            </Group>
          </form>
        ) : (
          <SimpleGrid>
            <Text>No Student available for enrollment</Text>

            <Group justify="flex-end" mt="xl" mb={"sm"}>
              <Button size="sm" color="sazim-green.7" onClick={close}>
                Cancel
              </Button>
            </Group>
          </SimpleGrid>
        )}
      </Box>
    </Modal>
  );
};

export default AddStudentModal;
