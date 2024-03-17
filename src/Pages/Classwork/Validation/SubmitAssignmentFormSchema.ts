import { z } from "zod";

import { SubmitAssignmentFormValues } from "../Components/SubmitAssignmentModal/SubmitAssignmentModalTypes";

const SubmitAssignmentSchema: z.Schema<SubmitAssignmentFormValues> = z
  .object({
    file: z.instanceof(File, { message: "File is required" }),
  })
  .strict()
  .required();

export default SubmitAssignmentSchema;
