import { ExamType } from "../../ClassworkTypes";

export interface UpdateExamFormModalProps {
  open: boolean;
  close: () => void;
  exam: ExamType;
}

export interface UpdateExamFormValues {
  title: string;
  description: string;
  date: Date;
}
