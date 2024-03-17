import { z } from "zod";

import { LoginFormValues } from "../Components/LoginForm/LoginFormTypes";

const LoginFormSchema: z.Schema<LoginFormValues> = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email")
      .max(255, { message: "Email can be at most 255 characters" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(255, { message: "Password can be at most 255 characters" }),
  })
  .strict();

export default LoginFormSchema;
