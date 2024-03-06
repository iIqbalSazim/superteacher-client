import * as yup from "yup";

import { TeacherFormValues } from "../Components/TeacherForm/TeacherFormTypes";

const lowercaseRegExp = /[a-z]/;
const uppercaseRegExp = /[A-Z]/;
const numberRegExp = /[0-9]/;

const TeacherFormSchema: yup.Schema<TeacherFormValues> = yup.object().shape({
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
    .min(1, "At least one subject to teach is required")
    .required("Subjects to teach is required"),
  email: yup
    .string()
    .email("Invalid email")
    .max(255, "Email must be at most 255 characters")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      lowercaseRegExp,
      "Password must contain at least one lowercase character"
    )
    .matches(
      uppercaseRegExp,
      "Password must contain at least one uppercase character"
    )
    .matches(numberRegExp, "Password must contain at least one number")
    .min(8, "Password should be at least 8 characters")
    .max(255, "Password must be at most 255 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .max(255, "Confirm password must be at most 255 characters")
    .required("Confirm password is required"),
});

export default TeacherFormSchema;
