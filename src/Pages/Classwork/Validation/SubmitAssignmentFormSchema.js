import * as yup from "yup";

const SubmitAssignmentSchema = yup.object().shape({
  file: yup.mixed().required("File is required"),
});

export default SubmitAssignmentSchema;
