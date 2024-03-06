import { useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppSelector } from "@/Stores/Store";
import { User } from "@/Types/SharedTypes";

import { getStudents } from "../Api/PeopleMethods";

export const useFetchStudents = (
  classroomId: number,
  setStudents: (value: React.SetStateAction<User[]>) => void,
  setNotEnrolledStudents: (value: React.SetStateAction<User[]>) => void
) => {
  const currentUser = useAppSelector((state) => state.auth.user) as User;
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
