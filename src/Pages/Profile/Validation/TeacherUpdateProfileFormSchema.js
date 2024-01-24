import * as yup from "yup";

const TeacherUpdateProfileFormSchema = yup.object().shape({
  first_name: yup
    .string()
    .max(255, "First name must be at most 255 characters")
    .required("First name is required"),
  last_name: yup
    .string()
    .max(255, "First name must be at most 255 characters")
    .required("Last name is required"),
  gender: yup.string().required("Gender is required"),
  major_subject: yup.string().required("Major subject is required"),
  highest_education_level: yup
    .string()
    .required("Highest education level is required"),
  subjects_to_teach: yup
    .array()
    .min(1, "At least one subject to teach is required"),
  email: yup
    .string()
    .email("Invalid email")
    .max(255, "Email must be at most 255 characters")
    .required("Email is required"),
});

export default TeacherUpdateProfileFormSchema;
