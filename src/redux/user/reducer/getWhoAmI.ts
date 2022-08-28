import { UserState } from "./user.reducer";
import { Action } from "redux";
import { WhoAmISuccessResponse } from "../../../types/backendResponses";
import { LOADING_TYPE } from "../../../types/loading";

interface IAction extends Action {
  payload: WhoAmISuccessResponse;
}

export const getWhoAmIRequest = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADING,
});

export const getWhoAmISuccess = (
  state: UserState,
  action: IAction
): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED,
  ...action.payload,
});

export const getWhoAmIFailed = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED_WITH_ERROR,
});
