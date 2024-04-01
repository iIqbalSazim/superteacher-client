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
      .string({
        invalid_type_error: "Gender is required",
      })
      .min(1, "Gender is required"),
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
          .string({
            invalid_type_error: "Education level is required",
          })
          .min(1, "Education level is required"),
        english_bangla_medium: z
          .string()
          .catch((ctx) => {
            ctx.error;
            return "";
          })
          .optional(),
        class_level: z
          .string({
            invalid_type_error: "Class level is required",
          })
          .catch((ctx) => {
            ctx.error;
            return "";
          })
          .optional(),
        degree_level: z
          .string({
            invalid_type_error: "Degree level is required",
          })
          .optional(),
        semester_year: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        const {
          level,
          class_level,
          english_bangla_medium,
          degree_level,
          semester_year,
        } = data;

        if (level === "School" || "College") {
          if (!english_bangla_medium || english_bangla_medium.length < 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Medium is required",
              path: ["english_bangla_medium"],
            });
          }

          if (!class_level || class_level.length < 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Class level is required",
              path: ["class_level"],
            });
          }
        }

        if (level === "University") {
          if (!degree_level || degree_level.length < 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Degree is required",
              path: ["degree_level"],
            });
          }

          if (!semester_year || semester_year.length < 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Semester/Year is required",
              path: ["semester_year"],
            });
          }
        }
      }),
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
  );

export default StudentFormSchema;
