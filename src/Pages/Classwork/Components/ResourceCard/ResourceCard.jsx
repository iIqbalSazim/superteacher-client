import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons-react";

import UpdateAssignmentFormModal from "../UpdateAssignmentFormModal/UpdateAssignmentFormModal";
import UpdateMaterialFormModal from "../UpdateMaterialFormModal/UpdateMaterialFormModal";
import ConfirmDeleteResourceModal from "../ConfirmDeleteResourceModal/ConfirmDeleteResourceModal";
import SubmitAssignmentModal from "../SubmitAssignmentModal/SubmitAssignmentModal";
import ConfirmDeleteSubmissionModal from "../ConfirmDeleteSubmissionModal/ConfirmDeleteSubmissionModal";
import SubmissionsContainerModal from "../SubmissionsContainerModal/SubmissionsContainerModal";
import ResourceCardHeader from "../ResourceCardTitle/ResourceCardHeader";
import ResourceEditMenu from "../ResourceEditMenu/ResourceEditMenu";
import ResourceCardDueDateAndSubmissions from "../ResourceCardDueDateAndSubmissions/ResourceCardDueDateAndSubmissions";

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
    const { url, title, resource_type } = resource;

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title} ${resource_type}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error fetching or creating blob:", error);
    }
  };

  const downloadSubmission = async (submission) => {
    const { url } = submission;
    const { title } = resource;

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
          <ResourceCardHeader resource={resource} />

          {currentUser.role === "teacher" ? (
            <ResourceEditMenu
              resource={resource}
              setIsUpdateAssignmentModalOpen={setIsUpdateAssignmentModalOpen}
              setIsUpdateMaterialModalOpen={setIsUpdateMaterialModalOpen}
              setIsDeleteResourceModalOpen={setIsDeleteResourceModalOpen}
            />
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

        <ResourceCardDueDateAndSubmissions
          resource={resource}
          setIsSubmissionsContainerModalOpen={
            setIsSubmissionsContainerModalOpen
          }
          setIsSubmitAssignmentModalOpen={setIsSubmitAssignmentModalOpen}
          userSubmission={userSubmission}
          downloadSubmission={downloadSubmission}
          setIsDeleteSubmissionModalOpen={setIsDeleteSubmissionModalOpen}
        />
      </Card>

      {isUpdateAssignmentModalOpen &&
      resource.resource_type === "assignment" &&
      currentUser.role === "teacher" ? (
        <UpdateAssignmentFormModal
          open={isUpdateAssignmentModalOpen}
          close={() => setIsUpdateAssignmentModalOpen(false)}
          assignment={resource}
          setUploadedAssignments={setUploadedAssignments}
        />
      ) : null}

      {isUpdateMaterialModalOpen &&
      resource.resource_type === "material" &&
      currentUser.role === "teacher" ? (
        <UpdateMaterialFormModal
          open={isUpdateMaterialModalOpen}
          close={() => setIsUpdateMaterialModalOpen(false)}
          material={resource}
          setUploadedMaterials={setUploadedMaterials}
        />
      ) : null}

      {isDeleteResourceModalOpen && currentUser.role === "teacher" ? (
        <ConfirmDeleteResourceModal
          open={isDeleteResourceModalOpen}
          close={() => setIsDeleteResourceModalOpen(false)}
          setUploadedAssignments={setUploadedAssignments}
          setUploadedMaterials={setUploadedMaterials}
          resource={resource}
        />
      ) : null}

      {isSubmitAssignmentModalOpen &&
      resource.resource_type === "assignment" &&
      currentUser.role === "student" ? (
        <SubmitAssignmentModal
          open={isSubmitAssignmentModalOpen}
          close={() => setIsSubmitAssignmentModalOpen(false)}
          setUploadedAssignments={setUploadedAssignments}
          resource={resource}
        />
      ) : null}

      {isDeleteSubmissionModalOpen &&
      resource.resource_type === "assignment" &&
      currentUser.role === "student" ? (
        <ConfirmDeleteSubmissionModal
          open={isDeleteSubmissionModalOpen}
          close={() => setIsDeleteSubmissionModalOpen(false)}
          setUploadedAssignments={setUploadedAssignments}
          resource={resource}
          submission={userSubmission}
        />
      ) : null}

      {resource.resource_type === "assignment" &&
      currentUser.role === "teacher" &&
      isSubmissionsContainerModalOpen ? (
        <SubmissionsContainerModal
          open={isSubmissionsContainerModalOpen}
          close={() => setIsSubmissionsContainerModalOpen(false)}
          resource={resource}
          downloadSubmission={downloadSubmission}
        />
      ) : null}
    </>
  );
};

export default ResourceCard;
