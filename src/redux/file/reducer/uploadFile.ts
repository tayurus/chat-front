import { FileState } from "./file.reducer";
import { LOADING_TYPE } from "src/types/loading";

export const uploadFileRequest = (state: FileState): FileState => ({
  ...state,
  fileLoading: LOADING_TYPE.LOADING,
});

export const uploadFileSuccess = (state: FileState): FileState => ({
  ...state,
  fileLoading: LOADING_TYPE.LOADED,
});

export const uploadFileFailed = (state: FileState): FileState => ({
  ...state,
  fileLoading: LOADING_TYPE.LOADED_WITH_ERROR,
});
