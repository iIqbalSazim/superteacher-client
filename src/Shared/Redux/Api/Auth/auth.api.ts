import projectApi from "../api.config";
import {
  TLoginRequestFields,
  TAuthResponse,
  TTokenRequestFields,
  TTokenResponse,
  TCreateUserParams,
  TLogoutPayload,
} from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TAuthResponse, TLoginRequestFields>({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: TAuthResponse) => {
        return response;
      },
    }),
    logout: builder.mutation<{ message: string }, TLogoutPayload>({
      query: (payload) => ({
        url: "/oauth/revoke",
        method: "POST",
        body: payload,
        responseHandler: "content-type",
      }),
    }),
    generateToken: builder.mutation<TTokenResponse, TTokenRequestFields>({
      query: (payload) => ({
        url: "/oauth/token",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: TTokenResponse) => response,
    }),
    createNewUser: builder.mutation<TAuthResponse, { user: TCreateUserParams }>(
      {
        query: (user) => ({
          url: "users",
          method: "POST",
          body: user,
        }),
        transformResponse: (response: TAuthResponse) => response,
      }
    ),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useGenerateTokenMutation,
  useCreateNewUserMutation,
  useLogoutMutation,
} = authApi;
