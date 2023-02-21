import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../../../API/Api";
import { RootState } from "../../../app/store";
import { IUser } from "../../../Domain/Model/IUser";
import { ILoginRequest } from "./ILoginRequest";
import { ILoginResponse } from "./ILoginResponse";

const loginApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;

const initialState: IUser = {
  id: "",
  email: "",
};
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<ILoginResponse>) => {
      state.id = payload.loginResponseDto.userId;
      state.email = payload.loginResponseDto.email;
      localStorage.setItem("token", payload.loginResponseDto.token);
    },
    logOut: (state) => {
      state.id = "";
      state.email = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logOut } = loginSlice.actions;
export default loginSlice.reducer;
export const selectCurrentUser = (state: RootState): IUser => state.auth;
