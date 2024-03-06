import { User } from "@/Types/SharedTypes";

export interface ConfirmRemoveStudentModalProps {
  open: boolean;
  close: () => void;
  removeStudent: (student_id: number) => void;
  student: User;
}
