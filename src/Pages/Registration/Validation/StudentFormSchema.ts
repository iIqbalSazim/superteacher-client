import { z } from "zod";

const phoneRegExp = /^(?:0)\d{10}$/;

const lowercaseRegExp = /[a-z]/;
const uppercaseRegExp = /[A-Z]/;
const numberRegExp = /[0-9]/;

const StudentFormSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "First name is required")
      .max(255, { message: "First name must be at most 255 characters" }),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .max(255, { message: "Last name must be at most 255 characters" }),
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
    address: z
      .string()
      .min(1, "Address is required")
      .max(1000, { message: "Address must be at most 1000 characters" }),
    phone_number: z
      .string()
      .min(1, "Phone number is required")
      .min(11, { message: "Phone number must be at least 11 characters" })
      .max(11, { message: "Phone number must not exceed 11 characters" })
      .regex(phoneRegExp, {
        message:
          "Phone number is not valid. Please follow this format: 01912345678",
      }),
    education: z
      .object({
        level: z
          .string()
          .min(1, "Education level is required")
          .nullish()
          .transform((value, ctx): string => {
            if (value == null)
              ctx.addIssue({
                code: "custom",
                message: "Education level is required",
              });

            return value as string;
          }),
        english_bangla_medium: z
          .string()
          .optional()
          .nullish()
          .transform((value, ctx): string => {
            if (value == null)
              ctx.addIssue({
                code: "custom",
                message: "Medium is required",
              });

            return value as string;
          }),
        class_level: z
          .string()
          .optional()
          .nullish()
          .transform((value, ctx): string => {
            if (value == null) {
              ctx.addIssue({
                code: "custom",
                message: "Class level is required",
              });
            }

            return value as string;
          }),
        degree_level: z
          .string()
          .optional()
          .nullish()
          .transform((value, ctx): string => {
            if (value == null) {
              ctx.addIssue({
                code: "custom",
                message: "Degree level is required",
              });
            }

            return value as string;
          }),
        semester_year: z.string().min(1, "Semester/Year is required"),
      })
      .required(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
      .max(255, { message: "Email must be at most 255 characters" }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, { message: "Password should be at least 8 characters" })
      .regex(lowercaseRegExp, {
        message: "Password must contain at least one lowercase character",
      })
      .regex(uppercaseRegExp, {
        message: "Password must contain at least one uppercase character",
      })
      .regex(numberRegExp, {
        message: "Password must contain at least one number",
      })
      .max(255, { message: "Password must be at most 255 characters" }),
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
      path: ["confirm_new_password"],
    }
  )
  .refine((data) => {
    const {
      level,
      english_bangla_medium,
      class_level,
      degree_level,
      semester_year,
    } = data.education;
    if (level === "School" || "College") {
      return !!english_bangla_medium && !!class_level;
    } else if (level === "University") {
      return !!degree_level && !!semester_year;
    } else {
      return true;
    }
  });

export default StudentFormSchema;
