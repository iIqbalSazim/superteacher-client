import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text } from "@mantine/core";

import { setAllClassrooms } from "../../../../Stores/Actions/Classroom";
import { getClassroomCards } from "../../Api/DashboardMethods";
import TeacherCards from "../TeacherCards/TeacherCards";

const ClassroomCardsContainer = () => {
  const [classrooms, setClassrooms] = useState([]);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClassroomCards();

        const classroomData = response.data.classrooms || [];

        dispatch(setAllClassrooms(classroomData));

        setClassrooms(classroomData);
      } catch (error) {
        console.log("Error fetching classroom data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Box p="md" mih={"100vh"}>
      {currentUser.role === "teacher" ? (
        <TeacherCards classrooms={classrooms} />
      ) : (
        <Text>Student Cards</Text>
      )}
    </Box>
  );
};

export default ClassroomCardsContainer;
