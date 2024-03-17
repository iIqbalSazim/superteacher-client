import { z } from "zod";

const AddStudentFormSchema = z
  .object({
    id: z
      .string()
      .min(1, "Pick a student to enroll")
      .nullish()
      .transform((value, ctx): string => {
        if (value == null)
          ctx.addIssue({
            code: "custom",
            message: "Pick a student to enroll",
          });

        return value as string;
      }),
  })
  .strict();

export default AddStudentFormSchema;
