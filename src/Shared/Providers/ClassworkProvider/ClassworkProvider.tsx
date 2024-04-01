import { createContext, useState } from "react";

import { ExamType, UploadedResource } from "@/Pages/Classwork/ClassworkTypes";

import {
  ClassworkContextType,
  ClassworkProviderProps,
} from "./ClassworkProviderTypes";

export const ClassworkContext = createContext<ClassworkContextType>({
  exams: [],
  uploadedAssignments: [],
  uploadedMaterials: [],
  setExams: () => {},
  setUploadedAssignments: () => {},
  setUploadedMaterials: () => {},
});

export const ClassworkProvider: React.FC<ClassworkProviderProps> = ({
  children,
}) => {
  const [uploadedMaterials, setUploadedMaterials] = useState<
    UploadedResource[]
  >([]);
  const [uploadedAssignments, setUploadedAssignments] = useState<
    UploadedResource[]
  >([]);
  const [exams, setExams] = useState<ExamType[]>([]);

  const contextValue = {
    exams,
    uploadedAssignments,
    uploadedMaterials,
    setExams,
    setUploadedAssignments,
    setUploadedMaterials,
  };

  return (
    <ClassworkContext.Provider value={contextValue}>
      {children}
    </ClassworkContext.Provider>
  );
};
