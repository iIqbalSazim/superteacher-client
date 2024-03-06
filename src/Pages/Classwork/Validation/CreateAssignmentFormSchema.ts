import * as yup from "yup";

import { CreateAssignmentFormValues } from "../Components/CreateAssignmentFormModal/CreateAssignmentFormModalTypes";

const CreateAssignmentFormSchema: yup.Schema<CreateAssignmentFormValues> = yup
  .object()
  .shape({
    title: yup
      .string()
      .required("Title is required")
      .max(255, "Title must be at most 255 characters"),
    file: yup.mixed<File>().required("File is required"),
    description: yup
      .string()
      .required("Description is required")
      .max(1000, "Description must be at most 1000 characters"),
    due_date: yup
      .date()
      .required("Due date is required")
      .min(new Date(), "Due date must be in the future"),
  });

export default CreateAssignmentFormSchema;
