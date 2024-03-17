import { Box, Button, Group, Modal, SimpleGrid, Text } from "@mantine/core";
import { Select } from "react-hook-form-mantine";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { enrollStudent } from "../../Api/PeopleMethods";
import {
  AddStudentFormValues,
  AddStudentModalProps,
} from "./AddStudentModalTypes";
import AddStudentFormSchema from "../../Validation/AddStudentFormSchema";

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  open,
  close,
  classroom,
  students,
  notEnrolledStudents,
  setNotEnrolledStudents,
  setStudents,
}) => {
  const {
    formState: { errors },
    control,
    reset,
  } = useForm<AddStudentFormValues>({
    defaultValues: {
      id: "",
    },
    resolver: zodResolver(AddStudentFormSchema),
  });

  const onSubmit: FormSubmitHandler<AddStudentFormValues> = async (
    formPayload
  ) => {
    try {
      const response = await enrollStudent(classroom.id, {
        student_id: parseInt(formPayload.data.id),
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

      reset();
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
          <Form control={control} onSubmit={onSubmit}>
            <SimpleGrid>
              <Select
                label="Type a name"
                placeholder="Pick student"
                data={notEnrolledStudents.map((student) => ({
                  label: `${student.first_name} ${student.last_name}`,
                  value: String(student.id),
                }))}
                searchable
                control={control}
                name="id"
                error={errors.id?.message}
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
          </Form>
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
