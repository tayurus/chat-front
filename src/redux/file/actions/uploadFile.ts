import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/helpers/api";
import { UploadFileResponse } from "src/types/backendResponses";
import {
  UploadFileBodyParams,
  UploadFileQueryParams,
} from "src/types/backendParams";
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
  RequestParams<UploadFileQueryParams, {}, UploadFileBodyParams>
>("file/uploadFile", async (params, thunkAPI) => {
  const {
    queryParams,
    bodyParams: { file },
  } = params;
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response: UploadFileResponse = await api.post(
      `${BASE_ROUTES.FILE}${FILE_ROUTES.UPLOAD}?${qs.stringify(queryParams)}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response;
  } catch (err: any) {
    message.error(`Upload file error - ${JSON.stringify(err)}`);
    return thunkAPI.rejectWithValue(err);
  }
});
