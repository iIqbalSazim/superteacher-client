import { UploadedResource } from "../../ClassworkTypes";

export interface ConfirmDeleteSubmissionModalProps {
  open: boolean;
  close: () => void;
  resource: UploadedResource;
  submissionId: number;
}
