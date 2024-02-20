import * as yup from "yup";

const ResetPasswordFormSchema = yup.object().shape({
  old_password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(255, "Password must be at most 255 characters")
    .required("Password is required"),
  new_password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(255, "Password must be at most 255 characters")
    .required("Password is required"),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match")
    .max(255, "Confirm password must be at most 255 characters")
    .required("Confirm password is required"),
});

export default ResetPasswordFormSchema;
