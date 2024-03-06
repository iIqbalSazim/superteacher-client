import { Submission, UploadedResource } from "../../ClassworkTypes";

export interface ResourceCardDueDateAndSubmissionsProps {
  resource: UploadedResource;
  setIsSubmissionsContainerModalOpen: (
    value: React.SetStateAction<boolean>
  ) => void;
  setIsSubmitAssignmentModalOpen: (
    value: React.SetStateAction<boolean>
  ) => void;
  userSubmission?: Submission;
  downloadSubmission: (submission: Submission) => void;
  setIsDeleteSubmissionModalOpen: (
    value: React.SetStateAction<boolean>
  ) => void;
}
