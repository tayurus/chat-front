import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ENDPOINTS } from "src/helpers/api";
import { RegisterUserSuccessResponse } from "../../../types/backendResponses";
import { RegisterUserBodyParams } from "../../../types/backendParams";
import { message } from "antd";
import { RequestParams } from "src/types/redux";

export type RegisterUserReturn = RegisterUserSuccessResponse;
export const register = createAsyncThunk<
  RegisterUserReturn,
  RequestParams<{}, {}, RegisterUserBodyParams>
>("user/register", async (params, thunkAPI) => {
  try {
    const { bodyParams } = params;
    const response: RegisterUserSuccessResponse = await api.post(
      ENDPOINTS.REGISTER,
      bodyParams
    );
    return response;
  } catch (err) {
    message.error(`register failed - ${JSON.stringify(err)}`);
    return thunkAPI.rejectWithValue(err);
  }
});
