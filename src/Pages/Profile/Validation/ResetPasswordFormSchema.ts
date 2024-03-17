import { z } from "zod";

import { ResetPasswordFormValues } from "../Components/ResetPasswordFormModal/ResetPasswordFormModalTypes";

const lowercaseRegExp = /[a-z]/;
const uppercaseRegExp = /[A-Z]/;
const numberRegExp = /[0-9]/;

const ResetPasswordFormSchema: z.Schema<ResetPasswordFormValues> = z
  .object({
    old_password: z
      .string()
      .min(1, "Password is required")
      .max(255, { message: "Password must be at most 255 characters" }),
    new_password: z
      .string()
      .min(1, "Password is required")
      .min(8, { message: "Password should be at least 8 characters" })
      .max(255, { message: "Password must be at most 255 characters" })
      .regex(lowercaseRegExp, {
        message: "Password must contain at least one lowercase character",
      })
      .regex(uppercaseRegExp, {
        message: "Password must contain at least one uppercase character",
      })
      .regex(numberRegExp, {
        message: "Password must contain at least one number",
      }),
    confirm_new_password: z
      .string()
      .min(1, "Confirm password is required")
      .max(255, { message: "Confirm password must be at most 255 characters" }),
  })
  .strict()
  .refine(
    (data) =>
      data.confirm_new_password === data.new_password ||
      data.confirm_new_password === "",
    {
      message: "Passwords must match",
      path: ["confirm_new_password"],
    }
  );

export default ResetPasswordFormSchema;
