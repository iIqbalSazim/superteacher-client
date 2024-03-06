import { createContext, useState } from "react";

import { ClassroomType } from "@/Types/SharedTypes";

import {
  ClassroomContextType,
  ClassroomProviderProps,
} from "./ClasrooomProviderTypes";

export const ClassroomContext = createContext<ClassroomContextType>({
  classroom: null,
  setClassroom: () => {},
});

export const ClassroomProvider: React.FC<ClassroomProviderProps> = ({
  children,
}) => {
  const [classroom, setClassroom] = useState<ClassroomType | null>(null);

  const contextValue: ClassroomContextType = {
    classroom,
    setClassroom,
  };

  return (
    <ClassroomContext.Provider value={contextValue}>
      {children}
    </ClassroomContext.Provider>
  );
};
