import { z } from "zod";

const isValidTimeFormat = (value: string) => {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(value);
};

const CreateClassroomFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .nullish()
    .transform((value, ctx): string => {
      if (value == null)
        ctx.addIssue({
          code: "custom",
          message: "Subject is required",
        });

      return value as string;
    }),
  class_time: z
    .string()
    .min(1, { message: "Class time is required" })
    .refine(isValidTimeFormat, {
      message: "Invalid time format. Please use the format 'HH:mm'.",
    })
    .nullish()
    .transform((value, ctx): string => {
      if (value == null)
        ctx.addIssue({
          code: "custom",
          message: "Class time is required",
        });

      return value as string;
    }),
  days: z
    .array(z.string())
    .min(1, { message: "At least one day is required" })
    .nonempty("Days are required"),
});

export default CreateClassroomFormSchema;
