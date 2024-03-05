import { useEffect } from "react";
import { fetchClassroom } from "../Api/ClassroomMethods";
import { notifications } from "@mantine/notifications";

export const useFetchClassroom = (classroomId, setClassroom) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchClassroom(classroomId);
        setClassroom(response.data.classroom || null);
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

    fetchData();
  }, [classroomId, setClassroom]);
};
