import { login, register, getWhoAmI, updatePassword } from "../actions";
import { createReducer } from "@reduxjs/toolkit";
import { LOADING_TYPE } from "src/types/loading";
import { LoginSuccessResponse } from "src/types/backendResponses";
import { DEFAULT_EMPTY_STRING } from "src/helpers/constants";

import { loginRequest, loginSuccess, loginFailed } from "./login";
import { registerRequest, registerSuccess, registerFailed } from "./register";
import {
  getWhoAmIRequest,
  getWhoAmISuccess,
  getWhoAmIFailed,
} from "./getWhoAmI";
import {
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
} from "./updatePassword";

export type UserState = {
  userLoading: LOADING_TYPE;
} & LoginSuccessResponse;

const initialState: UserState = {
  userLoading: LOADING_TYPE.INITIAL,
  email: DEFAULT_EMPTY_STRING,
  first_name: DEFAULT_EMPTY_STRING,
  last_name: DEFAULT_EMPTY_STRING,
  profilePhoto: DEFAULT_EMPTY_STRING,
  id: DEFAULT_EMPTY_STRING,
};

export const userReducer = createReducer(initialState, {
  [login.pending.toString()]: loginRequest,
  [login.fulfilled.toString()]: loginSuccess,
  [login.rejected.toString()]: loginFailed,

  [register.pending.toString()]: registerRequest,
  [register.fulfilled.toString()]: registerSuccess,
  [register.rejected.toString()]: registerFailed,

  [getWhoAmI.pending.toString()]: getWhoAmIRequest,
  [getWhoAmI.fulfilled.toString()]: getWhoAmISuccess,
  [getWhoAmI.rejected.toString()]: getWhoAmIFailed,

  [updatePassword.pending.toString()]: updatePasswordRequest,
  [updatePassword.fulfilled.toString()]: updatePasswordSuccess,
  [updatePassword.rejected.toString()]: updatePasswordFailed,
});
