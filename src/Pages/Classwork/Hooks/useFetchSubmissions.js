import { useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { getSubmissions } from "../Api/ClassworkMethods";

export const useFetchSubmissions = (
  classroomId,
  assignmentId,
  setSubmissions,
  setIsLoading
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
