import * as yup from "yup";

import { ScheduleExamFormValues } from "../Components/ScheduleExamFormModal/ScheduleExamFormModalTypes";

const ScheduleExamFormSchema: yup.Schema<ScheduleExamFormValues> = yup
  .object()
  .shape({
    title: yup
      .string()
      .required("Title is required")
      .max(255, "Title must be at most 255 characters"),
    description: yup
      .string()
      .required("Description is required")
      .max(1000, "Description must be at most 1000 characters"),
    date: yup
      .date()
      .required("Due date is required")
      .min(new Date(), "Due date must be in the future"),
  });

export default ScheduleExamFormSchema;
