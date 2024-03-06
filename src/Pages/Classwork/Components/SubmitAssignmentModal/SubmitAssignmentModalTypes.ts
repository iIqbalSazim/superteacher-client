import { UploadedResource } from "../../ClassworkTypes";

export interface SubmitAssignmentModalProps {
  open: boolean;
  close: () => void;
  resource: UploadedResource;
}

export interface SubmitAssignmentFormValues {
  file: File | null;
}
