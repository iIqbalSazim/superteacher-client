import { ClassroomType } from "@/Types/SharedTypes";

export interface ScheduleExamFormModalProps {
  open: boolean;
  close: () => void;
  classroom: ClassroomType;
}

export interface ScheduleExamFormValues {
  title: string;
  description: string;
  date: Date | string;
}
