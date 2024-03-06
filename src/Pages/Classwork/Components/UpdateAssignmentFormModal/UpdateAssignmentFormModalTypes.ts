import { UploadedResource } from "../../ClassworkTypes";

export interface UpdateAssignmentFormModalProps {
  open: boolean;
  close: () => void;
  assignment: UploadedResource;
}
