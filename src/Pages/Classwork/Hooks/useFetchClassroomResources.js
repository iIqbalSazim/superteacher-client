import { useEffect } from "react";

import { handleErrorMessage } from "@/Shared/SharedHelpers";

import { generateAssignments, generateMaterials } from "../ClassworkHelpers";
import { getClassroomResources } from "../Api/ClassworkMethods";

export const useFetchClassroomResources = (
  classroomId,
  setUploadedMaterials,
  setUploadedAssignments
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClassroomResources(classroomId);

        const resourcesInLatestFirstOrder = response.data.resources
          ? response.data.resources.reverse()
          : [];

        const assignments = generateAssignments(resourcesInLatestFirstOrder);
        const materials = generateMaterials(resourcesInLatestFirstOrder);

        setUploadedMaterials(materials);
        setUploadedAssignments(assignments);
      } catch (error) {
        handleErrorMessage(error);
      }
    };

    fetchData();
  }, [classroomId, setUploadedAssignments, setUploadedMaterials]);
};
