import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/helpers/api";
import { UploadFileResponse } from "../../../types/backendResponses";
import { UploadFileQueryParams } from "src/types/backendParams";
import { RequestParams } from "src/types/redux";
import qs from "qs";
import { message } from "antd";
import {
  BASE_ROUTES,
  FILE_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

export type UploadFileReturn = UploadFileResponse;
export const uploadFile = createAsyncThunk<
  UploadFileReturn,
  RequestParams<UploadFileQueryParams>
>("file/uploadFile", async (params, thunkAPI) => {
  const { queryParams } = params;
  try {
    const response: UploadFileResponse = await api.get(
      `${BASE_ROUTES.FILE}${FILE_ROUTES.UPLOAD}?${qs.stringify(queryParams)}`
    );
    return response;
  } catch (err: any) {
    message.error(`Upload file error - ${JSON.stringify(err)}`);
    return thunkAPI.rejectWithValue(err);
  }
});
