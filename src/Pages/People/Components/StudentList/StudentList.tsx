import { useState } from "react";
import { ActionIcon, Flex, Group, SimpleGrid, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";

import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";
import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { removeStudentFromClassroom } from "../../Api/PeopleMethods";
import ConfirmRemoveStudentModal from "../ConfirmRemoveStudentModal/ConfirmRemoveStudentModal";
import { StudentListProps } from "./StudentListTypes";

const StudentList: React.FC<StudentListProps> = ({
  classroom,
  students,
  notEnrolledStudents,
  setNotEnrolledStudents,
  setStudents,
}) => {
  const [isConfirmRemoveStudentModalOpen, setIsConfirmRemoveStudentModalOpen] =
    useState(false);
  const [studentToBeRemoved, setStudentToBeRemoved] = useState<User>();

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const closeConfirmRemoveStudentModal = () => {
    setIsConfirmRemoveStudentModalOpen(false);
  };

  const removeStudent = async (studentId: number) => {
    try {
      const response = await removeStudentFromClassroom(classroom.id, {
        student_id: studentId,
      });

      const removedStudent = response.data.removed_student;

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== removedStudent.id)
      );

      setNotEnrolledStudents([...notEnrolledStudents, removedStudent]);

      notifications.show({
        color: "sazim-purple.5",
        title: "Success",
        message: "Student successfully removed",
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  return (
    <SimpleGrid>
      {students.map((student) => (
        <Flex key={student.id} justify={"space-between"}>
          <Text>
            {student.first_name} {student.last_name}{" "}
            {currentUser.role === "student" &&
            student.email === currentUser.email
              ? "(you)"
              : null}
          </Text>
          <Group>
            <Text visibleFrom="xs">{student.email}</Text>
            {currentUser.role === "teacher" ? (
              <ActionIcon
                variant="subtle"
                color="sazim-purple"
                onClick={() => {
                  setIsConfirmRemoveStudentModalOpen(true);
                  setStudentToBeRemoved(student);
                }}
              >
                <IconTrash />
              </ActionIcon>
            ) : null}
          </Group>
        </Flex>
      ))}
      {studentToBeRemoved ? (
        <ConfirmRemoveStudentModal
          open={isConfirmRemoveStudentModalOpen !== false}
          close={closeConfirmRemoveStudentModal}
          removeStudent={removeStudent}
          student={studentToBeRemoved}
        />
      ) : null}
    </SimpleGrid>
  );
};

export default StudentList;
