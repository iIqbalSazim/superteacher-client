import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";

import { setAllClassrooms } from "@/Stores/Slices/ClassroomSlice";

import { fetchClassrooms } from "../Api/DashboardMethods";

export const useFetchClassrooms = (setClassrooms, setLoading) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClassroomCards = async () => {
      try {
        setLoading(true);

        const response = await fetchClassrooms();

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
  }, [dispatch, setClassrooms, setLoading]);
};
