import { ClassroomType, User } from "@/Types/SharedTypes";

export interface StudentListProps {
  classroom: ClassroomType;
  students: User[];
  notEnrolledStudents: User[];
  setStudents: (value: React.SetStateAction<User[]>) => void;
  setNotEnrolledStudents: (value: React.SetStateAction<User[]>) => void;
}
