export interface TeacherFormValues {
  code?: string;
  email: string;
  password: string;
  confirm_password: string;
  major_subject: string;
  highest_education_level: string;
  subjects_to_teach: string[];
  gender: string;
  first_name: string;
  last_name: string;
}

export interface TeacherFormApiError {
  data: {
    attempts_remaining: number;
  };
}
