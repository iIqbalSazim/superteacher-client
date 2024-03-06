import { useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { getSubmissions } from "../Api/ClassworkMethods";
import { Submission } from "../ClassworkTypes";

export const useFetchSubmissions = (
  classroomId: number,
  assignmentId: number,
  setSubmissions: (value: React.SetStateAction<Submission[]>) => void,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getSubmissions(classroomId, assignmentId);

        setSubmissions(response.data.submissions);
        setIsLoading(false);
      } catch (error) {
        handleErrorMessage(error);
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [classroomId, assignmentId, setSubmissions, setIsLoading]);
};
