import { useState } from "react";
import { Button, Collapse, Flex, SimpleGrid, Title } from "@mantine/core";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import ResourceCard from "../ResourceCard/ResourceCard";

const Assignments = ({ uploadedAssignments }) => {
  const [toggleAssignmentCollapse, setToggleAssignmentsCollapse] =
    useState(true);

  return (
    <>
      <Flex justify="flex-start">
        <Button
          variant="subtle"
          w={"fit"}
          size="compact"
          leftSection={
            toggleAssignmentCollapse ? (
              <IconChevronDown />
            ) : (
              <IconChevronRight />
            )
          }
          color="white"
          onClick={() =>
            setToggleAssignmentsCollapse(!toggleAssignmentCollapse)
          }
        >
          <Title my={"md"} order={2}>
            Assignments
          </Title>
        </Button>
      </Flex>

      <Collapse
        in={toggleAssignmentCollapse}
        transitionDuration={0}
        animateOpacity="false"
      >
        {uploadedAssignments && uploadedAssignments.length !== 0 ? (
          <SimpleGrid px={{ base: "", xs: "sm" }}>
            {uploadedAssignments.map((resource) => (
              <ResourceCard resource={resource} key={resource.id} />
            ))}
          </SimpleGrid>
        ) : (
          <Title order={3} mx={"md"} fw={"400"} ta="center">
            No Assignments available
          </Title>
        )}
      </Collapse>
    </>
  );
};

export default Assignments;
