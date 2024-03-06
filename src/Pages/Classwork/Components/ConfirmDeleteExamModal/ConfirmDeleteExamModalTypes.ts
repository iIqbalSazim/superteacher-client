import { ExamType } from "../../ClassworkTypes";

export interface ConfirmDeleteExamProps {
  open: boolean;
  close: () => void;
  exam: ExamType;
}
