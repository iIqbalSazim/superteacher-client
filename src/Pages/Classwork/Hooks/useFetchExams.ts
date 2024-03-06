import { useContext, useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { ClassworkContext } from "@/Providers/ClassworkProvider/ClassworkProvider";

import { sortExamsByDate } from "../ClassworkHelpers";
import { getExams } from "../Api/ClassworkMethods";

export const useFetchExams = (classroomId: number) => {
  const { setExams } = useContext(ClassworkContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getExams(classroomId);

        const examsArrangedByDate = sortExamsByDate(response.data.exams);

        setExams(examsArrangedByDate);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    fetchData();
  }, [classroomId, setExams]);
};
