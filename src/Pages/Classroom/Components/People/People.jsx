import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconSquareRoundedPlus, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import { setClassroomStudents } from "@/Stores/Actions/Classroom";

import {
  getAllNotEnrolledStudents,
  getClassroomStudents,
  removeStudentFromClassroom,
} from "../../Api/ClassroomMethods";
import AddStudentModal from "../AddStudentModal/AddStudentModal";

const People = ({ classroom }) => {
  const [students, setStudents] = useState([]);
  const [notEnrolledStudents, setNotEnrolledStudents] = useState([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClassroomStudents = async () => {
      try {
        const response = await getClassroomStudents(classroom.id);

        dispatch(setClassroomStudents(response.data.students));

        setStudents(response.data.students);
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

    const fetchAllNotEnrolledStudents = async () => {
      try {
        const response = await getAllNotEnrolledStudents(classroom.id);

        setNotEnrolledStudents(response.data.students);
      } catch (error) {
        let message;
        if (error.data) {
          message = error.data.message;
        } else {
          message = error.message;
        }

        notifications.show({
          color: "red",
          title: "Error",
          message: message,
        });
      }
    };

    fetchAllNotEnrolledStudents();
    fetchClassroomStudents();
  }, [classroom.id, dispatch]);

  const handleRemoveStudent = async (studentId) => {
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
    <Box mx="auto" py="sm" px="xl" mih={"100vh"} width={"100%"}>
      <Flex align={"center"} justify={"space-between"} mt={"md"}>
        <Title order={2}>Students</Title>
        <ActionIcon
          variant="subtle"
          color="sazim-green"
          onClick={() => setIsAddStudentModalOpen(true)}
        >
          <IconSquareRoundedPlus />
        </ActionIcon>
      </Flex>
      <Divider my="sm" />
      {students.length > 0 ? (
        <SimpleGrid>
          {students.map((student) => (
            <Flex key={student.id} justify={"space-between"}>
              <Text>
                {student.first_name} {student.last_name}
              </Text>
              <Group>
                <Text>{student.email}</Text>
                <ActionIcon
                  variant="subtle"
                  color="sazim-purple"
                  onClick={() => handleRemoveStudent(student.id)}
                >
                  <IconTrash />
                </ActionIcon>
              </Group>
            </Flex>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No students found for this classroom.</Text>
      )}
      <AddStudentModal
        open={isAddStudentModalOpen}
        close={closeAddStudentModal}
        notEnrolledStudents={notEnrolledStudents}
        setNotEnrolledStudents={setNotEnrolledStudents}
        students={students}
        classroom={classroom}
        setStudents={setStudents}
      />
    </Box>
  );
};

export default People;
