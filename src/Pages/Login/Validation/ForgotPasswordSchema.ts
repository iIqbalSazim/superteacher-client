import { z } from "zod";

import { ForgotPasswordResetValues } from "../Components/ForgotPasswordModal/ForgotPasswordModalTypes";
import { EmailFormValues } from "../Components/EmailForm/EmailFormTypes";
import { CodeFormValues } from "../Components/CodeForm/CodeFormTypes";

const lowercaseRegExp = /[a-z]/;
const uppercaseRegExp = /[A-Z]/;
const numberRegExp = /[0-9]/;

export const ForgotPasswordEmailSchema: z.Schema<EmailFormValues> = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .max(255, { message: "Email must be at most 255 characters" })
      .email("Invalid email"),
  })
  .strict();

export const ForgotPasswordCodeSchema: z.Schema<CodeFormValues> = z
  .object({
    code: z.string().min(1, "Code is required"),
  })
  .strict();

export const ForgotPasswordResetSchema: z.Schema<ForgotPasswordResetValues> = z
  .object({
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
