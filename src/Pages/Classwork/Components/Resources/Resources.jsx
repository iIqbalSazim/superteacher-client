import { SimpleGrid } from "@mantine/core";

import ResourceCard from "../ResourceCard/ResourceCard";

const Resources = ({ uploadedResources }) => {
  return (
    <SimpleGrid px={{ base: "", xs: "sm" }}>
      {uploadedResources.map((resource) => (
        <ResourceCard resource={resource} key={resource.id} />
      ))}
    </SimpleGrid>
  );
};

export default Resources;
