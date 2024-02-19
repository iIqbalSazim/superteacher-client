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
import SubmitAssignmentModal from "../SubmitAssignmentModal/SubmitAssignmentModal";
import ConfirmDeleteSubmissionModal from "../ConfirmDeleteSubmissionModal/ConfirmDeleteSubmissionModal";
import SubmissionsContainerModal from "../SubmissionsContainerModal/SubmissionsContainerModal";
import { formatDate } from "../../ClassworkHelpers";

const ResourceCard = ({
  resource,
  setUploadedAssignments,
  setUploadedMaterials,
}) => {
  const currentUser = useSelector((state) => state.auth.user);

  const [isUpdateAssignmentModalOpen, setIsUpdateAssignmentModalOpen] =
    useState(false);
  const [isUpdateMaterialModalOpen, setIsUpdateMaterialModalOpen] =
    useState(false);
  const [isDeleteResourceModalOpen, setIsDeleteResourceModalOpen] =
    useState(false);
  const [isSubmitAssignmentModalOpen, setIsSubmitAssignmentModalOpen] =
    useState(false);
  const [isDeleteSubmissionModalOpen, setIsDeleteSubmissionModalOpen] =
    useState(false);
  const [isSubmissionsContainerModalOpen, setIsSubmissionsContainerModalOpen] =
    useState(false);

  const downloadResource = async (resource) => {
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

  let userSubmission;

  if (currentUser.role === "student") {
    if (resource.resource_type === "assignment" && resource.submissions) {
      userSubmission = resource.submissions.find(
        (submission) => submission.student_id === currentUser.id
      );
    }
  }

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
                      ? setIsUpdateAssignmentModalOpen(true)
                      : setIsUpdateMaterialModalOpen(true)
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => setIsDeleteResourceModalOpen(true)}>
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
            onClick={() => downloadResource(resource)}
            rightSection={<IconFileDownload />}
            color="sazim-blue"
            size="compact-sm"
          >
            Download
          </Button>
        </Group>

        <Group justify="flex-end" mt={"md"} align="center">
          {resource.resource_type === "assignment" && resource.due_date ? (
            <>
              <Text
                c={
                  formatDate(Date.now()) > formatDate(resource.due_date)
                    ? "red.8"
                    : "sazim-blue"
                }
              >
                Due date: {formatDate(resource.due_date)}
              </Text>
              {currentUser.role === "teacher" ? (
                <>
                  {resource.submissions.length !== 0 ? (
                    <>
                      <Button
                        variant="outline"
                        color="sazim-blue"
                        onClick={() => setIsSubmissionsContainerModalOpen(true)}
                      >
                        Submissions
                      </Button>
                    </>
                  ) : null}
                </>
              ) : null}
              {currentUser.role === "student" ? (
                <>
                  {!userSubmission ? (
                    <Button
                      onClick={() => setIsSubmitAssignmentModalOpen(true)}
                      color="sazim-green"
                      size="compact-sm"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Menu
                      shadow="xl"
                      withArrow
                      offset={-3}
                      position="bottom-end"
                    >
                      <Menu.Target>
                        <Button
                          variant="outline"
                          size="compact-sm"
                          color="sazim-blue"
                        >
                          Submitted
                        </Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() => downloadResource(userSubmission)}
                        >
                          Download
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => setIsDeleteSubmissionModalOpen(true)}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </>
              ) : null}
            </>
          ) : null}
        </Group>
      </Card>

      {resource.resource_type === "assignment" &&
      currentUser.role === "teacher" ? (
        <UpdateAssignmentFormModal
          open={isUpdateAssignmentModalOpen}
          close={() => setIsUpdateAssignmentModalOpen(false)}
          assignment={resource}
          setUploadedAssignments={setUploadedAssignments}
        />
      ) : null}

      {resource.resource_type === "material" &&
      currentUser.role === "teacher" ? (
        <UpdateMaterialFormModal
          open={isUpdateMaterialModalOpen}
          close={() => setIsUpdateMaterialModalOpen(false)}
          material={resource}
          setUploadedMaterials={setUploadedMaterials}
        />
      ) : null}

      {currentUser.role === "teacher" ? (
        <ConfirmDeleteResourceModal
          open={isDeleteResourceModalOpen}
          close={() => setIsDeleteResourceModalOpen(false)}
          setUploadedAssignments={setUploadedAssignments}
          setUploadedMaterials={setUploadedMaterials}
          resource={resource}
        />
      ) : null}

      {resource.resource_type === "assignment" &&
      currentUser.role === "student" ? (
        <SubmitAssignmentModal
          open={isSubmitAssignmentModalOpen}
          close={() => setIsSubmitAssignmentModalOpen(false)}
          resource={resource}
        />
      ) : null}

      {resource.resource_type === "assignment" &&
      currentUser.role === "student" ? (
        <ConfirmDeleteSubmissionModal
          open={isDeleteSubmissionModalOpen}
          close={() => setIsDeleteSubmissionModalOpen(false)}
          resource={resource}
          submission={userSubmission}
        />
      ) : null}

      {resource.submissions &&
      currentUser.role === "teacher" &&
      resource.submissions.length !== 0 ? (
        <SubmissionsContainerModal
          open={isSubmissionsContainerModalOpen}
          close={() => setIsSubmissionsContainerModalOpen(false)}
          submissions={resource.submissions}
          downloadResource={downloadResource}
        />
      ) : null}
    </>
  );
};

export default ResourceCard;
