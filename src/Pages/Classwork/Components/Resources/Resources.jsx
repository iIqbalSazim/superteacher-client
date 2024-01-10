import { SimpleGrid } from "@mantine/core";

import ResourceCard from "../ResourceCard/ResourceCard";

const Resources = ({ uploadedResources }) => {
  return (
    <SimpleGrid mx={"xl"} px={"xl"}>
      {uploadedResources.map((resource) => (
        <ResourceCard resource={resource} key={resource.id} />
      ))}
    </SimpleGrid>
  );
};

export default Resources;
