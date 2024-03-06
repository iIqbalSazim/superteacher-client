import { UploadedResource } from "../../ClassworkTypes";

export interface ConfirmDeleteResourceModal {
  open: boolean;
  close: () => void;
  resource: UploadedResource;
}
