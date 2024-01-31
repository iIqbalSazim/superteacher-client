import { useState } from "react";
import { Button, Collapse, Flex, SimpleGrid, Title } from "@mantine/core";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import ResourceCard from "../ResourceCard/ResourceCard";

const Materials = ({ uploadedMaterials }) => {
  const [toggleMaterialsCollapse, setToggleMaterialsCollapse] = useState(true);

  return (
    <>
      <Flex>
        <Button
          variant="subtle"
          size="compact"
          leftSection={
            toggleMaterialsCollapse ? <IconChevronDown /> : <IconChevronRight />
          }
          color="white"
          onClick={() => setToggleMaterialsCollapse(!toggleMaterialsCollapse)}
        >
          <Title my={"md"} order={2}>
            Materials
          </Title>
        </Button>
      </Flex>

      <Collapse
        in={toggleMaterialsCollapse}
        transitionDuration={0}
        animateOpacity="false"
      >
        {uploadedMaterials && uploadedMaterials.length !== 0 ? (
          <SimpleGrid px={{ base: "", xs: "sm" }}>
            {uploadedMaterials.map((resource) => (
              <ResourceCard resource={resource} key={resource.id} />
            ))}
          </SimpleGrid>
        ) : (
          <Title order={3} mx={"md"} fw={"400"} ta="center">
            No Materials available
          </Title>
        )}
      </Collapse>
    </>
  );
};

export default Materials;