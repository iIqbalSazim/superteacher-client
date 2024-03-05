import { useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { sortByDate } from "../ClassworkHelpers";
import { getExams } from "../Api/ClassworkMethods";

export const useFetchExams = (classroomId, setExams) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getExams(classroomId);

        const examsArrangedByDate = sortByDate(response.data.exams, "date");

        setExams(examsArrangedByDate);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    fetchData();
  }, [classroomId, setExams]);
};
