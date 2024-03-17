export interface TeacherProfileType {
  id: number;
  teacher_id: number;
  highest_education_level: string;
  major_subject: string;
  subjects_to_teach: string[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  level?: string;
  english_bangla_medium?: string;
  class_level?: string;
  degree_level?: string;
  semester_year?: string;
}

export interface StudentProfileType {
  id: number;
  student_id: number;
  education: Education;
  address: string;
  created_at: string;
  updated_at: string;
}

type UserProfile = TeacherProfileType | StudentProfileType;

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number?: string;
  role: "teacher" | "student";
  profile: UserProfile;
}

interface Teacher {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number?: string;
  role: "teacher";
  profile: TeacherProfileType;
}

export interface ClassroomType {
  id: number;
  title: string;
  subject: string;
  class_time: string;
  days: string[];
  meet_link?: string;
  created_at: string;
  teacher: Teacher;
}

export interface ClassroomFormValues {
  teacher_id?: number | null;
  title?: string | null;
  subject?: string | null;
  class_time?: string | null;
  days?: string[] | null;
  meet_link?: string | null;
}
