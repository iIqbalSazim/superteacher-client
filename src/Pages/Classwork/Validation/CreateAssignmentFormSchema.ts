import { z } from "zod";

import { CreateAssignmentFormValues } from "../Components/CreateAssignmentFormModal/CreateAssignmentFormModalTypes";

const CreateAssignmentFormSchema: z.Schema<CreateAssignmentFormValues> = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(255, { message: "Title must be at most 255 characters" }),
    file: z.instanceof(File, { message: "File is required" }),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(1000, { message: "Description must be at most 1000 characters" }),
    due_date: z
      .date()
      .min(new Date(), { message: "Due date must be in the future" }),
  })
  .strict()
  .required();

export default CreateAssignmentFormSchema;
