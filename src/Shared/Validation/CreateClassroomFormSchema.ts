import * as yup from "yup";

import { ClassroomFormValues } from "@/Types/SharedTypes";

const CreateClassroomFormSchema: yup.Schema<ClassroomFormValues> = yup
  .object()
  .shape({
    title: yup.string().required("Title is required"),
    subject: yup.string().required("Subject is required"),
    class_time: yup.string().required("Class time is required"),
    days: yup
      .array()
      .min(1, "At least one day is required")
      .required("Days are required"),
  });

export default CreateClassroomFormSchema;
