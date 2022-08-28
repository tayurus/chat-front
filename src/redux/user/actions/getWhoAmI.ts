import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ENDPOINTS } from "src/helpers/api";
import { WhoAmIResponse } from "../../../types/backendResponses";
import { message } from "antd";

export const getWhoAmI = createAsyncThunk<WhoAmIResponse, undefined>(
  "user/getWhoAmI",
  async (params, thunkAPI) => {
    try {
      return await api.get(ENDPOINTS.WHO_AM_I, params);
    } catch (err) {
      message.error(`whoAmI failed - ${JSON.stringify(err)}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
