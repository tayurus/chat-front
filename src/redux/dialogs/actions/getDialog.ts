import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ENDPOINTS } from "src/helpers/api";
import { GetDialogSuccessResponse } from "../../../types/backendResponses";
import {
  GetDialogQueryParams,
  GetDialogUrlParams,
} from "../../../types/backendParams";
import { RequestParams } from "src/types/redux";
import qs from "qs";
import { message } from "antd";
import { appendUsersAction } from "src/redux/users/actions";

export type GetDialogReturn = GetDialogSuccessResponse;
export const getDialog = createAsyncThunk<
  GetDialogReturn,
  RequestParams<GetDialogQueryParams, GetDialogUrlParams>
>("dialogs/getDialog", async (params, thunkAPI) => {
  const {
    queryParams,
    urlParams: { dialogId },
  } = params;
  try {
    const response: GetDialogSuccessResponse = await api.get(
      `${ENDPOINTS.GET_DIALOG}/${dialogId}?${qs.stringify(queryParams)}`
    );
    thunkAPI.dispatch(appendUsersAction({ users: response.participants }));
    return response;
  } catch (err: any) {
    message.error(`Get Dialog error - ${JSON.stringify(err)}`);
    return thunkAPI.rejectWithValue(err);
  }
});
