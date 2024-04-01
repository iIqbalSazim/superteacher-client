import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/Types/SharedTypes";

import { AuthState, UserForAuthSlice } from "./AuthSliceTypes";

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserForAuthSlice>) => {
      const updatedUser = {
        ...state.user,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        gender: action.payload.gender,
        phone_number: action.payload.phone_number,
        role: action.payload.role,
        profile: action.payload.profile,
      };
      state.user = updatedUser;
    },
    resetAuthState: () => {
      return initialState;
    },
  },
});

export const { setUser, updateUser, resetAuthState } = authSlice.actions;

export default authSlice;
