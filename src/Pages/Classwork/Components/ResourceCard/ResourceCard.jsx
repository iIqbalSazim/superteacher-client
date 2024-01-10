import { Button, Card, Group, Text, ThemeIcon, Title } from "@mantine/core";
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
    <Card key={resource.title} my={"md"} padding={"md"} withBorder>
      <Group justify="flex-start">
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
        <Title order={3}>{resource.title}</Title>
      </Group>
      <Group justify="space-between">
        <Text c={"sazim-purple"} mt={"lg"} mb={"sm"}>
          {resource.description}
        </Text>
        <Button
          onClick={() => onDownloadButtonClick(resource)}
          rightSection={<IconFileDownload />}
          color="sazim-blue"
          size="md"
        >
          Download File
        </Button>
      </Group>
    </Card>
  );
};

export default ResourceCard;
