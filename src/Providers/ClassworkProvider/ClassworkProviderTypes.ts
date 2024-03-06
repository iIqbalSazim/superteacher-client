import { ReactNode } from "react";

import { ExamType, UploadedResource } from "@/Pages/Classwork/ClassworkTypes";

export interface ClassworkContextType {
  exams: ExamType[];
  uploadedAssignments: UploadedResource[];
  uploadedMaterials: UploadedResource[];
  setExams: React.Dispatch<React.SetStateAction<ExamType[]>>;
  setUploadedAssignments: React.Dispatch<
    React.SetStateAction<UploadedResource[]>
  >;
  setUploadedMaterials: React.Dispatch<
    React.SetStateAction<UploadedResource[]>
  >;
}

export interface ClassworkProviderProps {
  children: ReactNode;
}
