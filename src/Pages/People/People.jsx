import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Divider, Text } from "@mantine/core";

import AddStudentModal from "./Components/AddStudentModal/AddStudentModal";
import StudentList from "./Components/StudentList/StudentList";
import TeacherHeadingAndList from "./Components/TeacherHeadingAndList/TeacherHeadingAndList";
import StudentHeadingAndAddButton from "./Components/StudentHeadingAndAddButton/StudentHeadingAndAddButton";
import { useFetchStudents } from "./Hooks/useFetchStudents";

const People = ({ classroom }) => {
  const [students, setStudents] = useState([]);
  const [notEnrolledStudents, setNotEnrolledStudents] = useState([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
  };

  const currentUser = useSelector((state) => state.auth.user);

  useFetchStudents(
    classroom.id,
    setStudents,
    setNotEnrolledStudents,
    currentUser
  );

  return (
    <>
      <Box mx="xs" py="sm" px="xl" mih={"100vh"} width={"100%"}>
        <TeacherHeadingAndList
          classroom={classroom}
          currentUser={currentUser}
        />
        <StudentHeadingAndAddButton
          setIsAddStudentModalOpen={setIsAddStudentModalOpen}
          currentUser={currentUser}
        />
        <Divider my="sm" />
        {students.length > 0 ? (
          <StudentList
            classroom={classroom}
            students={students}
            currentUser={currentUser}
            notEnrolledStudents={notEnrolledStudents}
            setNotEnrolledStudents={setNotEnrolledStudents}
            setStudents={setStudents}
          />
        ) : (
          <Text>No students found for this classroom.</Text>
        )}
      </Box>
      <AddStudentModal
        open={isAddStudentModalOpen}
        close={closeAddStudentModal}
        notEnrolledStudents={notEnrolledStudents}
        setNotEnrolledStudents={setNotEnrolledStudents}
        students={students}
        classroom={classroom}
        setStudents={setStudents}
      />
    </>
  );
};

export default People;
