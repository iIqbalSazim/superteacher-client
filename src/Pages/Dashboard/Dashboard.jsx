import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import MyLoader from "@/Shared/Components/MyLoader/MyLoader";
import { setAllClassrooms } from "@/Stores/Actions/Classroom";

import { getClassroomCards } from "./Api/DashboardMethods";
import CardsContainer from "./Components/CardsContainer/CardsContainer";

const Dashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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

    fetchClassroomCards();
  }, [dispatch]);

  return (
    <Box p="md" mih={"100vh"}>
      {loading ? <MyLoader /> : <CardsContainer classrooms={classrooms} />}
    </Box>
  );
};

export default Dashboard;
