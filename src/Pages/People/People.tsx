import { useState } from "react";
import { Box, Divider, Text } from "@mantine/core";

import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";

import AddStudentModal from "./Components/AddStudentModal/AddStudentModal";
import StudentList from "./Components/StudentList/StudentList";
import TeacherHeadingAndList from "./Components/TeacherHeadingAndList/TeacherHeadingAndList";
import StudentHeadingAndAddButton from "./Components/StudentHeadingAndAddButton/StudentHeadingAndAddButton";
import { useFetchStudents } from "./Hooks/useFetchStudents";
import { PeopleProps } from "./PeopleTypes";

const People: React.FC<PeopleProps> = ({ classroom }) => {
  const [students, setStudents] = useState<User[]>([]);
  const [notEnrolledStudents, setNotEnrolledStudents] = useState<User[]>([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
  };

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  useFetchStudents(classroom.id, setStudents, setNotEnrolledStudents);

  return (
    <>
      <Box mx="xs" py="sm" px="xl" mih={"100vh"} w={"100%"}>
        <TeacherHeadingAndList classroom={classroom} />
        <StudentHeadingAndAddButton
          setIsAddStudentModalOpen={setIsAddStudentModalOpen}
        />
        <Divider my="sm" />
        {students.length > 0 ? (
          <StudentList
            classroom={classroom}
            students={students}
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
