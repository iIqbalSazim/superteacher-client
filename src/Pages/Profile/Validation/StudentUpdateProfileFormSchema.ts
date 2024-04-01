import { z } from "zod";

const phoneRegExp = /^(?:0)\d{10}$/;

const StudentUpdateProfileFormSchema = z
  .object({
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
    address: z
      .string()
      .max(1000, { message: "Address must be at most 1000 characters" })
      .min(1, "Address is required"),
    phone_number: z
      .string()
      .min(11, { message: "Phone number must be at least 11 characters" })
      .max(11, { message: "Phone number must not exceed 11 characters" })
      .regex(phoneRegExp, {
        message:
          "Phone number is not valid. Please follow this format: 01912345678",
      })
      .min(1, "Phone number is required"),
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
      .email("Invalid email")
      .max(255, { message: "Email must be at most 255 characters" })
      .min(1, "Email is required"),
  })
  .strict()
  .superRefine((data) => {
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

export default StudentUpdateProfileFormSchema;
