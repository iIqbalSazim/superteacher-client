import { Submission, UploadedResource } from "../../ClassworkTypes";

export interface SubmissionsContainerModalProps {
  open: boolean;
  close: () => void;
  resource: UploadedResource;
  downloadSubmission: (submission: Submission) => void;
}
