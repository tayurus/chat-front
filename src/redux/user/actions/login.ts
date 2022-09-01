import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/helpers/api";
import { LoginUserResponse } from "../../../types/backendResponses";
import { LoginUserBodyParams } from "../../../types/backendParams";
import { message } from "antd";
import {
  BASE_ROUTES,
  USER_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

export type LoginUserReturn = LoginUserResponse;
export const login = createAsyncThunk<LoginUserReturn, LoginUserBodyParams>(
  "user/login",
  async (params, thunkAPI) => {
    try {
      const response: LoginUserResponse = await api.post(
        `${BASE_ROUTES.USER}${USER_ROUTES.LOGIN}`,
        params
      );
      message.success("login success");
      return response;
    } catch (err) {
      message.error(`login failed - ${JSON.stringify(err)}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
