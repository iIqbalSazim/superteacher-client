import { z } from "zod";

import { ScheduleExamFormValues } from "../Components/ScheduleExamFormModal/ScheduleExamFormModalTypes";

const ScheduleExamFormSchema: z.Schema<ScheduleExamFormValues> = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(255, { message: "Title must be at most 255 characters" }),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(1000, { message: "Description must be at most 1000 characters" }),
    date: z
      .date()
      .min(new Date(), { message: "Due date must be in the future" }),
  })
  .strict();

export default ScheduleExamFormSchema;
