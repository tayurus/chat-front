import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/helpers/api";
import { RegisterUserSuccessResponse } from "../../../types/backendResponses";
import { RegisterUserBodyParams } from "../../../types/backendParams";
import { message } from "antd";
import { RequestParams } from "src/types/redux";
import {
  BASE_ROUTES,
  USER_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

export type RegisterUserReturn = RegisterUserSuccessResponse;
export const register = createAsyncThunk<
  RegisterUserReturn,
  RequestParams<{}, {}, RegisterUserBodyParams>
>("user/register", async (params, thunkAPI) => {
  try {
    const { bodyParams } = params;
    const response: RegisterUserSuccessResponse = await api.post(
      `${BASE_ROUTES.USER}${USER_ROUTES.REGISTER}`,
      bodyParams
    );
    return response;
  } catch (err) {
    message.error(`register failed - ${JSON.stringify(err)}`);
    return thunkAPI.rejectWithValue(err);
  }
});
