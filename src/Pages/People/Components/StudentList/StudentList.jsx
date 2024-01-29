import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionIcon, Flex, Group, SimpleGrid, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";

import { setClassroomStudents } from "@/Stores/Actions/Classroom";

import ConfirmRemoveStudentModal from "../ConfirmRemoveStudentModal/ConfirmRemoveStudentModal";
import { removeStudentFromClassroom } from "../../Api/PeopleMethods";

const StudentList = ({
  classroom,
  students,
  currentUser,
  notEnrolledStudents,
  setNotEnrolledStudents,
  setStudents,
}) => {
  const [isConfirmRemoveStudentModalOpen, setIsConfirmRemoveStudentModalOpen] =
    useState(false);
  const [studentToBeRemoved, setStudentToBeRemoved] = useState(null);

  const closeConfirmRemoveStudentModal = () => {
    setIsConfirmRemoveStudentModalOpen(false);
  };

  const dispatch = useDispatch();

  const removeStudent = async (studentId) => {
    try {
      const response = await removeStudentFromClassroom({
        classroom_student: {
          classroom_id: classroom.id,
          student_id: studentId,
        },
      });

      const removedStudent = response.data.removed_student;

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== removedStudent.id)
      );

      setNotEnrolledStudents([...notEnrolledStudents, removedStudent]);

      dispatch(setClassroomStudents(response.data.students));

      notifications.show({
        color: "sazim-purple.5",
        title: "Success",
        message: "Student successfully removed",
      });
    } catch (error) {
      let message;
      if (error.data) {
        message = error.data.message;
      } else {
        message = error.message;
      }

      if (message) {
        notifications.show({
          color: "red",
          title: "Error",
          message: message,
        });
      }
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
