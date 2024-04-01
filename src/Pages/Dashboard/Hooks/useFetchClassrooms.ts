import { useEffect } from "react";

import { setAllClassrooms } from "@/Shared/Redux/Slices/ClassroomSlice/ClassroomSlice";
import { handleErrorMessage } from "@/Shared/SharedHelpers";
import { useAppDispatch } from "@/Shared/Redux/Store";
import { ClassroomType } from "@/Types/SharedTypes";

import { fetchClassrooms } from "../Api/DashboardMethods";

export const useFetchClassrooms = (
  setClassrooms: (classrooms: ClassroomType[]) => void,
  setLoading: (loading: boolean) => void
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchClassroomCards = async (): Promise<void> => {
      try {
        setLoading(true);

        const response = await fetchClassrooms();

        const classroomData = response.data.classrooms || [];

        dispatch(setAllClassrooms(classroomData));

        setClassrooms(classroomData);

        setLoading(false);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    fetchClassroomCards();
  }, [dispatch, setClassrooms, setLoading]);
};
