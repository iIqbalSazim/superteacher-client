import { z } from "zod";

import { AddMeetLinkFormValues } from "../Components/AddMeetLinkFormModal/AddMeetLinkTypes";

const meetLinkRegex =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

const AddMeetLinkFormSchema: z.Schema<AddMeetLinkFormValues> = z
  .object({
    meet_link: z
      .string()
      .min(1, "Meet link is required")
      .regex(meetLinkRegex, { message: "Invalid link" })
      .max(255, { message: "Meet link can be at most 255 characters" }),
  })
  .strict();

export default AddMeetLinkFormSchema;
