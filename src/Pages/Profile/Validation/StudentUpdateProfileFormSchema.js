import * as yup from "yup";

const StudentUpdateProfileFormSchema = yup.object().shape({
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
    .max(10, "Phone number must be at most 11 characters")
    .min(10, "Phone number must be at least 11 characters")
    .required("Phone number is required"),
  education: yup.object().shape({
    level: yup.string().required("Education level is required"),
    english_bangla_medium: yup.string().when("education.level", {
      is: (val) => ["School", "College"].includes(val),
      then: yup.string().required("Medium is required"),
    }),
    class_level: yup.string().when("education.level", {
      is: (val) => ["School", "College"].includes(val),
      then: yup.string().required("Class is required"),
    }),
    degree_level: yup.string().when("education.level", {
      is: "University",
      then: yup.string().required("Degree level is required"),
    }),
    semester_year: yup.string().when("education.level", {
      is: "University",
      then: yup.string().required("Semester/Year is required"),
    }),
  }),
  email: yup
    .string()
    .email("Invalid email")
    .max(255, "Email must be at most 255 characters")
    .required("Email is required"),
});

export default StudentUpdateProfileFormSchema;
