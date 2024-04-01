import { useState } from "react";
import { Button, Card, Flex, Group, Text } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons-react";

import { User } from "@/Types/SharedTypes";
import { useAppSelector } from "@/Shared/Redux/Store";

import UpdateAssignmentFormModal from "../UpdateAssignmentFormModal/UpdateAssignmentFormModal";
import UpdateMaterialFormModal from "../UpdateMaterialFormModal/UpdateMaterialFormModal";
import ConfirmDeleteResourceModal from "../ConfirmDeleteResourceModal/ConfirmDeleteResourceModal";
import SubmitAssignmentModal from "../SubmitAssignmentModal/SubmitAssignmentModal";
import ConfirmDeleteSubmissionModal from "../ConfirmDeleteSubmissionModal/ConfirmDeleteSubmissionModal";
import SubmissionsContainerModal from "../SubmissionsContainerModal/SubmissionsContainerModal";
import ResourceCardHeader from "../ResourceCardHeader/ResourceCardHeader";
import ResourceEditMenu from "../ResourceEditMenu/ResourceEditMenu";
import ResourceCardDueDateAndSubmissions from "../ResourceCardDueDateAndSubmissions/ResourceCardDueDateAndSubmissions";
import { Submission, UploadedResource } from "../../ClassworkTypes";

const ResourceCard: React.FC<{ resource: UploadedResource }> = ({
  resource,
}) => {
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

  const currentUser = useAppSelector((state) => state.auth.user) as User;

  const downloadResource = async (resource: UploadedResource) => {
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

  const downloadSubmission = async (submission: Submission) => {
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
        />
      ) : null}

      {isUpdateMaterialModalOpen &&
      resource.resource_type === "material" &&
      currentUser.role === "teacher" ? (
        <UpdateMaterialFormModal
          open={isUpdateMaterialModalOpen}
          close={() => setIsUpdateMaterialModalOpen(false)}
          material={resource}
        />
      ) : null}

      {isDeleteResourceModalOpen && currentUser.role === "teacher" ? (
        <ConfirmDeleteResourceModal
          open={isDeleteResourceModalOpen}
          close={() => setIsDeleteResourceModalOpen(false)}
          resource={resource}
        />
      ) : null}

      {isSubmitAssignmentModalOpen &&
      resource.resource_type === "assignment" &&
      currentUser.role === "student" ? (
        <SubmitAssignmentModal
          open={isSubmitAssignmentModalOpen}
          close={() => setIsSubmitAssignmentModalOpen(false)}
          resource={resource}
        />
      ) : null}

      {isDeleteSubmissionModalOpen &&
      resource.resource_type === "assignment" &&
      currentUser.role === "student" ? (
        <ConfirmDeleteSubmissionModal
          open={isDeleteSubmissionModalOpen}
          close={() => setIsDeleteSubmissionModalOpen(false)}
          resource={resource}
          submissionId={userSubmission!.id as number}
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
