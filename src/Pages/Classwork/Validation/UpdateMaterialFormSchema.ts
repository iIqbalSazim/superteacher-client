import { z } from "zod";

import { CreateMaterialFormValues } from "../Components/CreateMaterialFormModal/CreateMaterialFormModalTypes";

const UpdateMaterialFormSchema: z.Schema<Partial<CreateMaterialFormValues>> = z
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
  })
  .strict();

export default UpdateMaterialFormSchema;
