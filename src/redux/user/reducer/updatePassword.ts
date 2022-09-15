import { UserState } from "./user.reducer";
import { LOADING_TYPE } from "src/types/loading";

export const updatePasswordRequest = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADING,
});

export const updatePasswordSuccess = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED,
});

export const updatePasswordFailed = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED_WITH_ERROR,
});
