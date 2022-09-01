import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/helpers/api";
import { WhoAmIResponse } from "../../../types/backendResponses";
import { message } from "antd";
import {
  BASE_ROUTES,
  USER_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

export const getWhoAmI = createAsyncThunk<WhoAmIResponse, undefined>(
  "user/getWhoAmI",
  async (params, thunkAPI) => {
    try {
      return await api.get(
        `${BASE_ROUTES.USER}${USER_ROUTES.WHO_AM_I}`,
        params
      );
    } catch (err) {
      message.error(`whoAmI failed - ${JSON.stringify(err)}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
