import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import CreateFileButtonGroup from "./Components/CreateFileButtonGroup/CreateFileButtonGroup";
import ResourcesSection from "./Components/ResourcesSection/ResourcesSection";
import ExamsSection from "./Components/ExamsSection/ExamsSection";
import { getClassroomResources, getExams } from "./Api/ClassworkMethods";

const Classwork = ({ classroom }) => {
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);
  const [exams, setExams] = useState([]);

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

    const fetchExams = async () => {
      try {
        const response = await getExams(classroom.id);

        const examsInLatestFirstOrder = response.data.exams
          ? response.data.exams.reverse()
          : [];

        setExams(examsInLatestFirstOrder);
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
    fetchExams();
  }, [classroom.id]);

  const currentUser = useSelector((state) => state.auth.user);

  return (
    <Box
      mx={{ base: "xs", sm: "xl" }}
      py={"sm"}
      px={{ base: "", sm: "md" }}
      mih={"100vh"}
    >
      {currentUser.role === "teacher" && (
        <CreateFileButtonGroup
          classroom={classroom}
          setUploadedAssignments={setUploadedAssignments}
          setUploadedMaterials={setUploadedMaterials}
          setExams={setExams}
        />
      )}
      {exams && exams.length !== 0 ? <ExamsSection exams={exams} /> : null}
      <ResourcesSection
        uploadedAssignments={uploadedAssignments}
        uploadedMaterials={uploadedMaterials}
      />
    </Box>
  );
};

export default Classwork;
