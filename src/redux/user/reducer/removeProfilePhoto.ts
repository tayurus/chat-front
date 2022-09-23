import { UserState } from "./user.reducer";
import { LOADING_TYPE } from "../../../types/loading";

export const removeProfilePhotoRequest = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADING,
});

export const removeProfilePhotoSuccess = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED,
});

export const removeProfilePhotoFailed = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED_WITH_ERROR,
});
