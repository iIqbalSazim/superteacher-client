import * as yup from "yup";

const RegistrationCodeFormSchema = yup.object().shape({
  code: yup
    .string()
    .min(6, "Code must be 6 characters")
    .max(6, "Code must be 6 characters")
    .required("Code is required"),
});

export default RegistrationCodeFormSchema;
