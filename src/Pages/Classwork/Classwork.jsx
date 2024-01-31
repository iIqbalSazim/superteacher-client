import { useEffect, useState } from "react";
import { Box, Divider, SimpleGrid } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import HeaderSection from "./Components/HeaderSection/HeaderSection";
import Materials from "./Components/Materials/Materials";
import Assignments from "./Components/Assignments/Assignments";
import { getClassroomResources } from "./Api/ClassworkMethods";

const Classwork = ({ classroom }) => {
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);

  useEffect(() => {
    const fetchClassroomResources = async () => {
      try {
        const response = await getClassroomResources(classroom.id);

        const resourcesInLatestFirstOrder = response.data.resources
          ? response.data.resources.reverse()
          : [];

        const assignments = resourcesInLatestFirstOrder.filter(
          (resource) => resource.resource_type === "assignment"
        );
        const materials = resourcesInLatestFirstOrder.filter(
          (resource) => resource.resource_type === "material"
        );

        setUploadedMaterials(materials);
        setUploadedAssignments(assignments);
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

    fetchClassroomResources();
  }, [classroom.id]);

  return (
    <Box
      mx={{ base: "xs", sm: "xl" }}
      py={"sm"}
      px={{ base: "", sm: "md" }}
      mih={"100vh"}
    >
      <HeaderSection
        classroom={classroom}
        setUploadedAssignments={setUploadedAssignments}
        setUploadedMaterials={setUploadedMaterials}
      />
      <SimpleGrid>
        <Divider my="lg" />
        <Materials uploadedMaterials={uploadedMaterials} />
        <Assignments uploadedAssignments={uploadedAssignments} />
      </SimpleGrid>
    </Box>
  );
};

export default Classwork;
