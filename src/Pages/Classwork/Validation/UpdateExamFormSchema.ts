import { z } from "zod";

import { ExamType } from "../ClassworkTypes";

const UpdateExamFormSchema: z.Schema<Partial<ExamType>> = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters" })
      .max(255, { message: "Title must be at most 255 characters" })
      .optional(),
    description: z
      .string()
      .min(5, { message: "Description must be at least 5 characters" })
      .max(1000, { message: "Description must be at most 1000 characters" })
      .optional(),
  })
  .strict();

export default UpdateExamFormSchema;
