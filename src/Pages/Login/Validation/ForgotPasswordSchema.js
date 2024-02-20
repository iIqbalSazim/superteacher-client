import * as yup from "yup";

const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .max(255, "Email must be at most 255 characters")
    .required("Email is required"),
});

export default ForgotPasswordSchema;
