import * as yup from "yup";

const AddMeetLinkFormSchema = yup.object().shape({
  meet_link: yup
    .string()
    .max(255, "Meet link can be at most 255 characters")
    .required("Meet link is required"),
});

export default AddMeetLinkFormSchema;
