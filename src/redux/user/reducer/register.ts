import { UserState } from "./user.reducer";
import { LOADING_TYPE } from "../../../types/loading";

export const registerRequest = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADING,
});

export const registerSuccess = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED,
});

export const registerFailed = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED_WITH_ERROR,
});
