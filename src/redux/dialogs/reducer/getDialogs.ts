import { DialogsState } from "./dialogs.reducer";
import { Action } from "redux";
import { dialogsAdapter } from "./dialogs.reducer";
import { DialogInResponse } from "../../../types/backendResponses";
import { LOADING_TYPE } from "../../../types/loading";

interface IAction extends Action {
  payload: DialogInResponse[];
}

export const getDialogsRequest = (state: DialogsState): DialogsState => ({
  ...state,
  dialogsLoading: LOADING_TYPE.LOADING,
});

export const getDialogsSuccess = (state: DialogsState, action: IAction) => {
  dialogsAdapter.setAll(state, action.payload);
  state.dialogsLoading = LOADING_TYPE.LOADED;
};

export const getDialogsFailed = (state: DialogsState): DialogsState => ({
  ...state,
  dialogsLoading: LOADING_TYPE.LOADED,
});
