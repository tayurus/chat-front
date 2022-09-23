import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/helpers/api";
import { RequestParams } from "src/types/redux";
import { message } from "antd";
import {
  BASE_ROUTES,
  USER_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

export type RemoveProfilePhoto = boolean;
export const removeProfileFile = createAsyncThunk<
  RemoveProfilePhoto,
  RequestParams
>("user/removeProfilePhoto", async (params, thunkAPI) => {
  try {
    await api.delete(`${BASE_ROUTES.USER}${USER_ROUTES.REMOVE_PROFILE_PHOTO}`);
    return true;
  } catch (err: any) {
    message.error(`remove user profile photo error - ${JSON.stringify(err)}`);
    return thunkAPI.rejectWithValue(false);
  }
});
