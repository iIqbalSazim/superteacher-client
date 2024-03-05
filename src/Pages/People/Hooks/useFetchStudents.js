import { useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { getStudents } from "../Api/PeopleMethods";

export const useFetchStudents = (
  classroomId,
  setStudents,
  setNotEnrolledStudents,
  currentUser
) => {
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await getStudents(classroomId, "enrolled");
        setStudents(response.data.students);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    const fetchNotEnrolledStudents = async () => {
      try {
        const response = await getStudents(classroomId, "unenrolled");
        setNotEnrolledStudents(response.data.students);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    if (currentUser.role === "teacher") {
      fetchNotEnrolledStudents();
    }
    fetchEnrolledStudents();
  }, [classroomId, setStudents, setNotEnrolledStudents, currentUser]);
};
