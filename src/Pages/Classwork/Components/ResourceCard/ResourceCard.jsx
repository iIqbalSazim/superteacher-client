import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBook2,
  IconDots,
  IconFileDownload,
  IconFilePencil,
} from "@tabler/icons-react";

import UpdateAssignmentFormModal from "../UpdateAssignmentFormModal/UpdateAssignmentFormModal";
import UpdateMaterialFormModal from "../UpdateMaterialFormModal/UpdateMaterialFormModal";
import ConfirmDeleteResourceModal from "../ConfirmDeleteResourceModal/ConfirmDeleteResourceModal";
import { formatDate } from "../../ClassworkHelpers";

const ResourceCard = ({
  resource,
  setUploadedAssignments,
  setUploadedMaterials,
}) => {
  const currentUser = useSelector((state) => state.auth.user);

  const [isOpenUpdateAssignmentModal, setIsOpenUpdateAssignmentModal] =
    useState(false);

  const [isOpenUpdateMaterialModal, setIsOpenUpdateMaterialModal] =
    useState(false);

  const [isOpenDeleteResourceModal, setIsOpenDeleteResourceModal] =
    useState(false);

  const closeDeleteResourceModal = () => {
    setIsOpenDeleteResourceModal(false);
  };

  const closeUpdateMaterialModal = () => {
    setIsOpenUpdateMaterialModal(false);
  };

  const closeUpdateAssignmentModal = () => {
    setIsOpenUpdateAssignmentModal(false);
  };

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
    <>
      <Card my={"md"} px={{ base: "xs", sm: "md", md: "lg" }}>
        <Flex justify="space-between" wrap="wrap">
          <Flex justify={"flex-start"} align="center" gap={"sm"}>
            {resource.resource_type === "assignment" ? (
              <ThemeIcon
                radius={"xl"}
                variant="light"
                color="sazim-blue"
                size={"lg"}
              >
                <IconFilePencil />
              </ThemeIcon>
            ) : (
              <ThemeIcon
                radius={"xl"}
                variant="light"
                color="sazim-blue"
                size={"lg"}
              >
                <IconBook2 />
              </ThemeIcon>
            )}
            <Title order={4}>{resource.title}</Title>
          </Flex>
          {currentUser.role === "teacher" ? (
            <Menu shadow="xl" withArrow offset={-3} position="bottom-end">
              <Menu.Target>
                <ActionIcon m={"lg"} variant="transparent" color="sazim-blue">
                  <IconDots />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() =>
                    resource.resource_type === "assignment"
                      ? setIsOpenUpdateAssignmentModal(true)
                      : setIsOpenUpdateMaterialModal(true)
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => setIsOpenDeleteResourceModal(true)}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : null}
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
            Download
          </Button>
        </Group>

        <Group justify="flex-end" mt={"sm"}>
          {resource.resource_type === "assignment" && resource.due_date ? (
            <Text>Due date: {formatDate(resource.due_date)}</Text>
          ) : null}
        </Group>
      </Card>

      {resource.resource_type === "assignment" ? (
        <UpdateAssignmentFormModal
          open={isOpenUpdateAssignmentModal}
          close={closeUpdateAssignmentModal}
          assignment={resource}
          setUploadedAssignments={setUploadedAssignments}
        />
      ) : null}

      {resource.resource_type === "material" ? (
        <UpdateMaterialFormModal
          open={isOpenUpdateMaterialModal}
          close={closeUpdateMaterialModal}
          material={resource}
          setUploadedMaterials={setUploadedMaterials}
        />
      ) : null}

      <ConfirmDeleteResourceModal
        open={isOpenDeleteResourceModal}
        close={closeDeleteResourceModal}
        setUploadedAssignments={setUploadedAssignments}
        setUploadedMaterials={setUploadedMaterials}
        resource={resource}
      />
    </>
  );
};

export default ResourceCard;
