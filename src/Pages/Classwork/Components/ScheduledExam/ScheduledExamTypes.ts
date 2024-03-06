import { ExamType } from "../../ClassworkTypes";

export interface ScheduledExamProps {
  exam: ExamType;
  openDeleteExamModal: (exam: ExamType) => void;
  openUpdateExamModal: (exam: ExamType) => void;
}
