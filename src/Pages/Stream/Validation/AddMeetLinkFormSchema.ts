import * as yup from "yup";

import { AddMeetLinkFormValues } from "../Components/AddMeetLinkFormModal/AddMeetLinkTypes";

const meetLinkRegex =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

const AddMeetLinkFormSchema: yup.Schema<AddMeetLinkFormValues> = yup
  .object()
  .shape({
    meet_link: yup
      .string()
      .matches(meetLinkRegex, "Invalid link")
      .max(255, "Meet link can be at most 255 characters")
      .required("Meet link is required"),
  });

export default AddMeetLinkFormSchema;
