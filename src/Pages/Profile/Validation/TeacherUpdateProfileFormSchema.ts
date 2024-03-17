import { z } from "zod";

import { TeacherProfileFormValues } from "../Components/TeacherUpdateProfileForm/TeacherUpdateProfileFormTypes";

export interface TeacherProfleFormSchema
  extends Omit<TeacherProfileFormValues, "subjects_to_teach"> {
  subjects_to_teach?: (string | undefined)[] | undefined;
}

const TeacherUpdateProfileFormSchema = z
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
  })
  .strict();

export default TeacherUpdateProfileFormSchema;
