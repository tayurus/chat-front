import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ENDPOINTS } from "src/helpers/api";
import {
  GetDialogsSuccessResponse,
  UserInfoInDialog,
} from "../../../types/backendResponses";
import { GetDialogsParams } from "../../../types/backendParams";
import { message } from "antd";
import { appendUsersAction } from "src/redux/users/actions";

export type GetDialogsReturn = GetDialogsSuccessResponse;
export const getDialogs = createAsyncThunk<GetDialogsReturn, GetDialogsParams>(
  "dialogs/getDialogs",
  async (params, thunkAPI) => {
    try {
      const response: GetDialogsSuccessResponse = await api.get(
        ENDPOINTS.GET_DIALOGS
      );
      const allDialogsParticipants = response.reduce(
        (acc: UserInfoInDialog[], it) => [...acc, ...it.participants],
        []
      );
      thunkAPI.dispatch(appendUsersAction({ users: allDialogsParticipants }));
      return response;
    } catch (err) {
      message.error(`Get Dialogs error - ${JSON.stringify(err)}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
