import { Divider, SimpleGrid, Title } from "@mantine/core";

import Materials from "../Materials/Materials";
import Assignments from "../Assignments/Assignments";

const ResourcesSection = ({
  setUploadedAssignments,
  setUploadedMaterials,
  uploadedAssignments,
  uploadedMaterials,
}) => {
  return (
    <>
      <Title my={"sm"} mt={"xl"} order={2}>
        Uploaded Resources
      </Title>
      <SimpleGrid>
        <Divider my="sm" />
        <Materials
          uploadedMaterials={uploadedMaterials}
          setUploadedMaterials={setUploadedMaterials}
        />
        <Assignments
          setUploadedAssignments={setUploadedAssignments}
          uploadedAssignments={uploadedAssignments}
        />
      </SimpleGrid>
    </>
  );
};

export default ResourcesSection;
