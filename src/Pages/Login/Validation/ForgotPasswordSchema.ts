import * as yup from "yup";

import { ForgotPasswordResetValues } from "../Components/ForgotPasswordModal/ForgotPasswordModalTypes";
import { EmailFormValues } from "../Components/EmailForm/EmailFormTypes";
import { CodeFormValues } from "../Components/CodeForm/CodeFormTypes";

const lowercaseRegExp = /[a-z]/;
const uppercaseRegExp = /[A-Z]/;
const numberRegExp = /[0-9]/;

export const ForgotPasswordEmailSchema: yup.Schema<EmailFormValues> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Invalid email")
      .max(255, "Email must be at most 255 characters")
      .required("Email is required"),
  });

export const ForgotPasswordCodeSchema: yup.Schema<CodeFormValues> = yup
  .object()
  .shape({
    code: yup.string().required("Code is required"),
  });

export const ForgotPasswordResetSchema: yup.Schema<ForgotPasswordResetValues> =
  yup.object().shape({
    new_password: yup
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
    confirm_new_password: yup
      .string()
      .oneOf([yup.ref("new_password"), ""], "Passwords must match")
      .max(255, "Confirm password must be at most 255 characters")
      .required("Confirm password is required"),
  });
