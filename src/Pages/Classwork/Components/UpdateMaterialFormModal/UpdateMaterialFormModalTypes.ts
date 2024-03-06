import { UploadedResource } from "../../ClassworkTypes";

export interface UpdateMaterialFormModalProps {
  open: boolean;
  close: () => void;
  material: UploadedResource;
}
