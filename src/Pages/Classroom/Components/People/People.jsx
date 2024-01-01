import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";

import { setClassroomStudents } from "../../../../Stores/Actions/Classroom";
import {
  getAllNotEnrolledStudents,
  getClassroomStudents,
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
        console.error("Error fetching classroom students:", error);
      }
    };

    const fetchAllNotEnrolledStudents = async () => {
      try {
        const response = await getAllNotEnrolledStudents(classroom.id);

        setNotEnrolledStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchAllNotEnrolledStudents();
    fetchClassroomStudents();
  }, [classroom.id, dispatch]);

  return (
    <Box mx="auto" py="sm" px="xl" mih={"100vh"} width={"100%"}>
      <Flex align={"center"} justify={"space-between"} mt={"md"}>
        <Title order={2}>Students</Title>
        <ActionIcon
          variant="subtle"
          color="white"
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
              <Text>{student.email}</Text>
            </Flex>
          ))}
        </SimpleGrid>
      ) : (
        <p>No students found for this classroom.</p>
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
