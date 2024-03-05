import { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mantine/core";

import CreateFileButtonGroup from "./Components/CreateFileButtonGroup/CreateFileButtonGroup";
import ResourcesSection from "./Components/ResourcesSection/ResourcesSection";
import ExamsContainer from "./Components/ExamsContainer/ExamsContainer";
import { useFetchClassroomResources } from "./Hooks/useFetchClassroomResources";
import { useFetchExams } from "./Hooks/useFetchExams";

const Classwork = ({ classroom }) => {
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [uploadedAssignments, setUploadedAssignments] = useState([]);
  const [exams, setExams] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);

  useFetchClassroomResources(
    classroom.id,
    setUploadedMaterials,
    setUploadedAssignments
  );

  useFetchExams(classroom.id, setExams);

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
