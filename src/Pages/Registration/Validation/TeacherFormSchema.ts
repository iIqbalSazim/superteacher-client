import { z } from "zod";

const lowercaseRegExp = /[a-z]/;
const uppercaseRegExp = /[A-Z]/;
const numberRegExp = /[0-9]/;

const TeacherFormSchema = z
  .object({
    code: z.string().min(1, "Code is required"),
    first_name: z
      .string()
      .max(255, { message: "First name must be at most 255 characters" })
      .min(1, "First name is required"),
    last_name: z
      .string()
      .max(255, { message: "Last name must be at most 255 characters" })
      .min(1, "Last name is required"),
    gender: z
      .string()
      .min(1, "Gender is required")
      .nullish()
      .transform((value, ctx): string => {
        if (value == null)
          ctx.addIssue({
            code: "custom",
            message: "Gender is required",
          });

        return value as string;
      }),
    major_subject: z.string().min(1, "Major subject is required"),
    highest_education_level: z
      .string()
      .min(1, "Highest education level is required")
      .nullish()
      .transform((value, ctx): string => {
        if (value == null)
          ctx.addIssue({
            code: "custom",
            message: "Highest education level is required",
          });

        return value as string;
      }),
    subjects_to_teach: z
      .array(z.string())
      .min(1, { message: "At least one subject to teach is required" }),
    email: z
      .string()
      .email("Invalid email")
      .max(255, { message: "Email must be at most 255 characters" })
      .min(1, "Email is required"),
    password: z
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
    confirm_password: z
      .string()
      .min(1, "Confirm password is required")
      .max(255, { message: "Confirm password must be at most 255 characters" }),
  })
  .strict()
  .refine(
    (data) =>
      data.confirm_password === data.password || data.confirm_password === "",
    {
      message: "Passwords must match",
      path: ["confirm_password"],
    }
  );

export default TeacherFormSchema;
