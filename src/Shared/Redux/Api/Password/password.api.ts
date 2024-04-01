import projectApi from "../api.config";
import {
  TResetForgotPasswordPayload,
  TResetPasswordPayload,
  TResetTokenPayload,
  TValidateResetTokenPayload,
} from "./password.types";

const passwordApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    generateResetToken: builder.mutation<{ data: string }, TResetTokenPayload>({
      query: (payload) => ({
        url: "passwords/forgot/token",
        method: "POST",
        body: payload,
        responseHandler: "content-type",
      }),
    }),
    validateResetToken: builder.mutation<
      { data: string },
      TValidateResetTokenPayload
    >({
      query: (payload) => ({
        url: "passwords/forgot/validate",
        method: "POST",
        body: payload,
        responseHandler: "content-type",
      }),
    }),
    resetForgotPassword: builder.mutation<
      { message: string },
      TResetForgotPasswordPayload
    >({
      query: (payload) => ({
        url: "passwords/forgot/reset",
        method: "PUT",
        body: payload,
        responseHandler: "content-type",
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, TResetPasswordPayload>(
      {
        query: (payload) => ({
          url: "passwords/reset",
          method: "PUT",
          body: payload,
          responseHandler: "content-type",
        }),
      }
    ),
  }),
});

export const {
  useGenerateResetTokenMutation,
  useValidateResetTokenMutation,
  useResetForgotPasswordMutation,
  useResetPasswordMutation,
} = passwordApi;
