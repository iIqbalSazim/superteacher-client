import * as yup from "yup";

import { ResetPasswordFormValues } from "../Components/ResetPasswordFormModal/ResetPasswordFormModalTypes";

const lowercaseRegExp = /[a-z]/;
const uppercaseRegExp = /[A-Z]/;
const numberRegExp = /[0-9]/;

const ResetPasswordFormSchema: yup.Schema<ResetPasswordFormValues> = yup
  .object()
  .shape({
    old_password: yup
      .string()
      .max(255, "Password must be at most 255 characters")
      .required("Password is required"),
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

export default ResetPasswordFormSchema;
