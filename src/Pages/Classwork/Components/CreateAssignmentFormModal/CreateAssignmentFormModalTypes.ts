import { ClassroomType } from "@/Types/SharedTypes";

export interface CreateAssignmentFormModalProps {
  open: boolean;
  close: () => void;
  classroom: ClassroomType;
}

export interface CreateAssignmentFormValues {
  title: string;
  description: string;
  file: File | null;
  due_date: Date | string;
}
