import * as yup from "yup";

import { CreateMaterialFormValues } from "../Components/CreateMaterialFormModal/CreateMaterialFormModalTypes";

const CreateMaterialFormSchema: yup.Schema<CreateMaterialFormValues> = yup
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
  });

export default CreateMaterialFormSchema;
