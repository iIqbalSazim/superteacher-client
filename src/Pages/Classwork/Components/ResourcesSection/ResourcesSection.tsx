import { Divider, SimpleGrid, Title } from "@mantine/core";

import Materials from "../Materials/Materials";
import Assignments from "../Assignments/Assignments";

const ResourcesSection: React.FC = () => {
  return (
    <>
      <Title my={"sm"} mt={"xl"} order={2}>
        Uploaded Resources
      </Title>
      <SimpleGrid>
        <Divider my="sm" />
        <Materials />
        <Assignments />
      </SimpleGrid>
    </>
  );
};

export default ResourcesSection;
