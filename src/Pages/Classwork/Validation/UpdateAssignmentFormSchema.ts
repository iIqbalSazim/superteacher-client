import { z } from "zod";

import { CreateAssignmentFormValues } from "../Components/CreateAssignmentFormModal/CreateAssignmentFormModalTypes";

const UpdateAssignmentFormSchema: z.Schema<
  Partial<CreateAssignmentFormValues>
> = z
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
    file: z.instanceof(File).nullable().optional(),
    due_date: z
      .date()
      .min(new Date(), { message: "Due date must be in the future" })
      .optional(),
  })
  .strict();

export default UpdateAssignmentFormSchema;
