import {
  Button,
  Card,
  Flex,
  Group,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBook2,
  IconClipboardText,
  IconFileDownload,
} from "@tabler/icons-react";

const ResourceCard = ({ resource }) => {
  const onDownloadButtonClick = async (resource) => {
    const { url, title } = resource;

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = title || "download";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error fetching or creating blob:", error);
    }
  };

  return (
    <Card
      key={resource.title}
      my={"md"}
      px={{ base: "xs", sm: "md", md: "lg" }}
      withBorder
    >
      <Flex justify="flex-start" wrap="wrap" gap={"sm"}>
        {resource.resource_type === "assignment" ? (
          <ThemeIcon
            radius={"xl"}
            variant="filled"
            color="sazim-blue"
            size={"lg"}
          >
            <IconClipboardText />
          </ThemeIcon>
        ) : (
          <ThemeIcon
            radius={"xl"}
            variant="filled"
            color="sazim-blue"
            size={"lg"}
          >
            <IconBook2 />
          </ThemeIcon>
        )}
        <Title order={4}>{resource.title}</Title>
      </Flex>
      <Text c={"sazim-blue"} my={"md"}>
        {resource.description}
      </Text>
      <Group justify="flex-end">
        <Button
          onClick={() => onDownloadButtonClick(resource)}
          rightSection={<IconFileDownload />}
          color="sazim-blue"
          size="compact-sm"
        >
          Download File
        </Button>
      </Group>
    </Card>
  );
};

export default ResourceCard;
