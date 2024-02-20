import * as yup from "yup";

const phoneRegExp =
  /^(?:\+[1-9]{1,4}[ -]*)?(?:\(\d{2,3}\)[ -]*)?(?:\d{2,4}[ -]*)*?\d{3,4}[ -]*\d{3,4}$/;

const StudentFormSchema = yup.object().shape({
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
      "Phone number is not valid. Please follow this format: +8801289394762"
    )
    .min(7, "Phone number must be at least 7 characters")
    .max(15, "Phone number must not exceed 15 characters"),
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
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(255, "Password must be at most 255 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .max(255, "Confirm password must be at most 255 characters")
    .required("Confirm password is required"),
});

export default StudentFormSchema;
