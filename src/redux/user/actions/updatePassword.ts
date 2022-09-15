import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/helpers/api";
import { UpdateUserPasswordResponse } from "src/types/backendResponses";
import { UpdateUserPasswordParams } from "src/types/backendParams";
import { message } from "antd";
import { RequestParams } from "src/types/redux";
import {
  BASE_ROUTES,
  USER_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

export type UpdatePasswordReturn = UpdateUserPasswordResponse;

export const updatePassword = createAsyncThunk<
  UpdatePasswordReturn,
  RequestParams<{}, {}, UpdateUserPasswordParams>
>("user/updatePassword", async (params, thunkAPI) => {
  try {
    const { bodyParams } = params;
    const response: UpdateUserPasswordResponse = await api.post(
      `${BASE_ROUTES.USER}${USER_ROUTES.UPDATE_PASSWORD}`,
      bodyParams
    );
    return response;
  } catch (err) {
    message.error(`update password failed - ${JSON.stringify(err)}`);
    return thunkAPI.rejectWithValue(err);
  }
});
