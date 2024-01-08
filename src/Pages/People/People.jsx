import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { setClassroomStudents } from "@/Stores/Actions/Classroom";

import {
  getAllNotEnrolledStudents,
  getClassroomStudents,
  removeStudentFromClassroom,
} from "./Api/PeopleMethods";
import AddStudentModal from "./Components/AddStudentModal/AddStudentModal";
import StudentList from "./Components/StudentList/StudentList";
import TeacherHeadingAndList from "./Components/TeacherHeadingAndList/TeacherHeadingAndList";
import StudentHeadingAndAddButton from "./Components/StudentHeadingAndAddButton/StudentHeadingAndAddButton";

const People = ({ classroom }) => {
  const [students, setStudents] = useState([]);
  const [notEnrolledStudents, setNotEnrolledStudents] = useState([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const closeAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
  };

  const currentUser = useSelector((state) => state.auth.user);

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

    if (currentUser.role === "teacher") {
      fetchAllNotEnrolledStudents();
    }
    fetchClassroomStudents();
  }, [classroom.id, dispatch, currentUser]);

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
    <Box mx="xs" py="sm" px="xl" mih={"100vh"} width={"100%"}>
      <TeacherHeadingAndList classroom={classroom} currentUser={currentUser} />
      <StudentHeadingAndAddButton
        setIsAddStudentModalOpen={setIsAddStudentModalOpen}
        currentUser={currentUser}
      />
      <Divider my="sm" />
      {students.length > 0 ? (
        <StudentList
          students={students}
          currentUser={currentUser}
          handleRemoveStudent={handleRemoveStudent}
        />
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
