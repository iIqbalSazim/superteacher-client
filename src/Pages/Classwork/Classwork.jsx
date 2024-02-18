import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import CreateFileButtonGroup from "./Components/CreateFileButtonGroup/CreateFileButtonGroup";
import ResourcesSection from "./Components/ResourcesSection/ResourcesSection";
import ExamsContainer from "./Components/ExamsContainer/ExamsContainer";
import { getClassroomResources, getExams } from "./Api/ClassworkMethods";
import {
  generateAssignments,
  generateMaterials,
  sortByDate,
} from "./ClassworkHelpers";

const Classwork = ({ classroom }) => {
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchClassroomResources = async () => {
      try {
        const response = await getClassroomResources(classroom.id);

        const resourcesInLatestFirstOrder = response.data.resources
          ? response.data.resources.reverse()
          : [];

        const assignments = generateAssignments(resourcesInLatestFirstOrder);
        const materials = generateMaterials(resourcesInLatestFirstOrder);

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

        const examsArrangedByDate = sortByDate(response.data.exams, "date");

        setExams(examsArrangedByDate);
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
      <ExamsContainer exams={exams} setExams={setExams} />
      <ResourcesSection
        uploadedAssignments={uploadedAssignments}
        setUploadedAssignments={setUploadedAssignments}
        setUploadedMaterials={setUploadedMaterials}
        uploadedMaterials={uploadedMaterials}
      />
    </Box>
  );
};

export default Classwork;
