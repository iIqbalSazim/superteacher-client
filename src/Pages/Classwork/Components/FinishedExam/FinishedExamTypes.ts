import { ExamType } from "../../ClassworkTypes";

export interface FinishedExamProps {
  exam: ExamType;
  openDeleteExamModal: (exam: ExamType) => void;
  openUpdateExamModal: (exam: ExamType) => void;
}
