import { Flex, ThemeIcon, Title } from "@mantine/core";
import { IconBook2, IconFilePencil } from "@tabler/icons-react";

import { UploadedResource } from "../../ClassworkTypes";

const ResourceCardHeader: React.FC<{ resource: UploadedResource }> = ({
  resource,
}) => {
  return (
    <Flex justify={"flex-start"} align="center" gap={"sm"}>
      {resource.resource_type === "assignment" ? (
        <ThemeIcon radius={"xl"} variant="light" color="sazim-blue" size={"lg"}>
          <IconFilePencil />
        </ThemeIcon>
      ) : (
        <ThemeIcon radius={"xl"} variant="light" color="sazim-blue" size={"lg"}>
          <IconBook2 />
        </ThemeIcon>
      )}
      <Title order={4}>{resource.title}</Title>
    </Flex>
  );
};

export default ResourceCardHeader;
