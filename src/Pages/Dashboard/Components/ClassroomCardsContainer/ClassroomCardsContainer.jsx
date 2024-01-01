import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text } from "@mantine/core";

import { setAllClassrooms } from "../../../../Stores/Actions/Classroom";
import { getClassroomCards } from "../../Api/DashboardMethods";
import TeacherCards from "../TeacherCards/TeacherCards";
import MyLoader from "../../../../Shared/Components/MyLoader/MyLoader";

const ClassroomCardsContainer = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchClassroomCards = async () => {
      try {
        setLoading(true);

        const response = await getClassroomCards();

        const classroomData = response.data.classrooms || [];

        dispatch(setAllClassrooms(classroomData));

        setClassrooms(classroomData);

        setLoading(false);
      } catch (error) {
        console.log("Error fetching classroom data:", error);
      }
    };

    fetchClassroomCards();
  }, [dispatch]);

  return (
    <Box p="md" mih={"100vh"}>
      {loading ? (
        <MyLoader />
      ) : currentUser.role === "teacher" ? (
        <TeacherCards classrooms={classrooms} />
      ) : (
        <Text>Student Cards</Text>
      )}
    </Box>
  );
};

export default ClassroomCardsContainer;
