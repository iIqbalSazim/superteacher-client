import * as yup from "yup";

import { LoginFormValues } from "../Components/LoginForm/LoginFormTypes";

const LoginFormSchema: yup.Schema<LoginFormValues> = yup.object().shape({
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
});

export default LoginFormSchema;
