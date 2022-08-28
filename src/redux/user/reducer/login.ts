import { UserState } from "./user.reducer";
import { Action } from "redux";
import { LoginSuccessResponse } from "../../../types/backendResponses";
import { LOADING_TYPE } from "../../../types/loading";

interface IAction extends Action {
  payload: LoginSuccessResponse;
}

export const loginRequest = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADING,
});

export const loginSuccess = (state: UserState, action: IAction): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED,
  ...action.payload,
});

export const loginFailed = (state: UserState): UserState => ({
  ...state,
  userLoading: LOADING_TYPE.LOADED_WITH_ERROR,
});
