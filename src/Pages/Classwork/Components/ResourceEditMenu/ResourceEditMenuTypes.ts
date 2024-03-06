import { UploadedResource } from "../../ClassworkTypes";

export interface ResourceEditMenuProps {
  resource: UploadedResource;
  setIsUpdateAssignmentModalOpen: (
    value: React.SetStateAction<boolean>
  ) => void;
  setIsUpdateMaterialModalOpen: (value: React.SetStateAction<boolean>) => void;
  setIsDeleteResourceModalOpen: (value: React.SetStateAction<boolean>) => void;
}
