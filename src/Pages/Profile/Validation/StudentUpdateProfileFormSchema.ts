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
