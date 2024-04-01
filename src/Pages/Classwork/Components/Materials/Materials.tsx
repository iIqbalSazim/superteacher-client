import { useContext, useState } from "react";
import { Button, Collapse, Flex, SimpleGrid, Title } from "@mantine/core";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import { ClassworkContext } from "@/Shared/Providers/ClassworkProvider/ClassworkProvider";

import ResourceCard from "../ResourceCard/ResourceCard";

const Materials = () => {
  const [toggleMaterialsCollapse, setToggleMaterialsCollapse] = useState(true);

  const { uploadedMaterials } = useContext(ClassworkContext);

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
          <Title my={"md"} order={3}>
            Materials
          </Title>
        </Button>
      </Flex>

      <Collapse
        in={toggleMaterialsCollapse}
        transitionDuration={0}
        animateOpacity={false}
      >
        {uploadedMaterials && uploadedMaterials.length !== 0 ? (
          <SimpleGrid px={{ base: "", xs: "sm" }}>
            {uploadedMaterials.map((resource) => (
              <ResourceCard resource={resource} key={resource.id} />
            ))}
          </SimpleGrid>
        ) : (
          <Title order={4} mx={"md"} fw={"400"} ta="center">
            No Materials available
          </Title>
        )}
      </Collapse>
    </>
  );
};

export default Materials;
