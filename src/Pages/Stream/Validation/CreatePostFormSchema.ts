import { z } from "zod";

import { CreatePostFormValues } from "../Components/CreatePostForm/CreatePostFormTypes";

const CreatePostFormSchema: z.Schema<CreatePostFormValues> = z
  .object({
    text: z.string().min(1, "You need to input a message in the text box"),
  })
  .strict();

export default CreatePostFormSchema;
