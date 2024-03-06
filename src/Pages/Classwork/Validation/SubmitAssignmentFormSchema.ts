import * as yup from "yup";

import { SubmitAssignmentFormValues } from "../Components/SubmitAssignmentModal/SubmitAssignmentModalTypes";

const SubmitAssignmentSchema: yup.Schema<SubmitAssignmentFormValues> = yup
  .object()
  .shape({
    file: yup.mixed<File>().required("File is required"),
  });

export default SubmitAssignmentSchema;
