import { useContext, useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassroomType } from "@/Types/SharedTypes";
import { ClassroomContext } from "@/Shared/Providers/ClassroomProvider/ClassroomProvider";

import { fetchClassroom } from "../Api/ClassroomMethods";

export const useFetchClassroom = (classroomId: number) => {
  const { setClassroom } = useContext(ClassroomContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchClassroom(classroomId);
        setClassroom(response.data.classroom as ClassroomType);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    fetchData();
  }, [classroomId, setClassroom]);
};
