import { ClassroomType } from "@/Types/SharedTypes";

export interface CreateMaterialFormModalProps {
  open: boolean;
  close: () => void;
  classroom: ClassroomType;
}

export interface CreateMaterialFormValues {
  title: string;
  description: string;
  file: File | null;
}
