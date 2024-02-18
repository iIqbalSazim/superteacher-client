import * as yup from "yup";

const UpdateMaterialFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(255, "Title must be at most 255 characters"),
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000, "Description must be at most 1000 characters"),
});

export default UpdateMaterialFormSchema;
