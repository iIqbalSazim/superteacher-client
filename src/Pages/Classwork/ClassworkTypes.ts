import { ClassroomType } from "@/Types/SharedTypes";

export interface Submission {
  id: number;
  student_id: number;
  assignment_id: number;
  url: string;
  submission_status: "late" | "submitted";
  created_at: string;
  student_name: string;
  submitted_on: string;
}

export interface ExamType {
  id: number;
  title: string;
  classroom_id: number;
  description: string;
  created_at: string;
  date: string | Date;
}

export interface UploadedResource {
  id: number;
  title: string;
  description: string;
  resource_type: string;
  classroom_id: number;
  url: string;
  created_at: string;
  due_date?: string;
  assignment_id?: number;
  submissions?: Submission[];
}

export interface ClassworkProps {
  classroom: ClassroomType;
}
