import { ClassroomType, User } from "@/Types/SharedTypes";

export interface AddStudentModalProps {
  open: boolean;
  close: () => void;
  classroom: ClassroomType;
  students: User[];
  notEnrolledStudents: User[];
  setStudents: (value: React.SetStateAction<User[]>) => void;
  setNotEnrolledStudents: (value: React.SetStateAction<User[]>) => void;
}

export interface AddStudentFormValues {
  id: string;
}
