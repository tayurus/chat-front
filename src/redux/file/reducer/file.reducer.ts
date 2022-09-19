import { uploadFile } from "src/redux/file/actions";
import { LOADING_TYPE } from "src/types/loading";
import { createReducer } from "@reduxjs/toolkit";
import {
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileFailed,
} from "./uploadFile";

export type FileState = { fileLoading: LOADING_TYPE };

const initialState: FileState = { fileLoading: LOADING_TYPE.INITIAL };

export const fileReducer = createReducer(initialState, {
  [uploadFile.pending.toString()]: uploadFileRequest,
  [uploadFile.fulfilled.toString()]: uploadFileSuccess,
  [uploadFile.rejected.toString()]: uploadFileFailed,
});
