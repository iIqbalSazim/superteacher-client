import { ReactNode } from "react";

import { ClassroomType } from "@/Types/SharedTypes";

export interface ClassroomContextType {
  classroom: ClassroomType | null;
  setClassroom: React.Dispatch<React.SetStateAction<ClassroomType | null>>;
}

export interface ClassroomProviderProps {
  children: ReactNode;
}
