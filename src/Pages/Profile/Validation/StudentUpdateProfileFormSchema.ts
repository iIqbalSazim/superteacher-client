import * as yup from "yup";

import { StudentProfileFormValues } from "../Components/StudentUpdateProfileForm/StudentUpdateProfileFormTypes";

const phoneRegExp = /^(?:0)\d{10}$/;

const StudentUpdateProfileFormSchema: yup.Schema<StudentProfileFormValues> = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .max(255, "First name must be at most 255 characters")
      .required("First name is required"),
    last_name: yup
      .string()
      .max(255, "First name must be at most 255 characters")
      .required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    address: yup
      .string()
      .max(1000, "Address must be at most 1000 characters")
      .required("Address is required"),
    phone_number: yup
      .string()
      .required("required")
      .matches(
        phoneRegExp,
        "Phone number is not valid. Please follow this format: 01912345678"
      )
      .min(11, "Phone number must be at least 11 characters")
      .max(11, "Phone number must not exceed 11 characters"),
    education: yup.object().shape({
      level: yup.string().required("Education level is required"),
      english_bangla_medium: yup.string().when("level", {
        is: (val: "School" | "College") => {
          return ["School", "College"].includes(val);
        },
        then: (s) => s.required("Medium is required"),
      }),
      class_level: yup.string().when("level", {
        is: (val: "School" | "College") => {
          return ["School", "College"].includes(val);
        },
        then: (s) => s.required("Class is required"),
      }),
      degree_level: yup.string().when("level", {
        is: "University",
        then: (s) => s.required("Degree level is required"),
      }),
      semester_year: yup.string().when("level", {
        is: "University",
        then: (s) => s.required("Semester/Year is required"),
      }),
    }),
    email: yup
      .string()
      .email("Invalid email")
      .max(255, "Email must be at most 255 characters")
      .required("Email is required"),
  });

export default StudentUpdateProfileFormSchema;
