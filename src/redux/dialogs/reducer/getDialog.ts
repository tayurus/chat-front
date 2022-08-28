import {
  DialogInState,
  dialogsSelectors,
  DialogsState,
} from "./dialogs.reducer";
import { Action } from "redux";
import { dialogsAdapter } from "./dialogs.reducer";
import { LOADING_TYPE } from "../../../types/loading";
import { GetDialogReturn } from "src/redux/dialogs/actions";
import {
  removeDuplicatesFromMessages,
  sortMessagesByDatetime,
} from "src/helpers/message";

interface IAction extends Action {
  payload: GetDialogReturn;
}

export const getDialogRequest = (state: DialogsState): DialogsState => ({
  ...state,
  dialogLoading: LOADING_TYPE.LOADING,
});

export const getDialogSuccess = (state: DialogsState, action: IAction) => {
  const oldMessages =
    dialogsSelectors.selectById(state, action.payload.id)?.messages || [];
  const newMessages = action.payload.messages;

  const updatedEntity: DialogInState = {
    id: action.payload.id,
    messages: sortMessagesByDatetime(
      removeDuplicatesFromMessages(oldMessages!.concat(newMessages))
    ),
    participants: action.payload.participants,
  };

  dialogsAdapter.upsertOne(state, updatedEntity);
  state.dialogLoading = LOADING_TYPE.LOADED;
};

export const getDialogFailed = (state: DialogsState): DialogsState => ({
  ...state,
  dialogLoading: LOADING_TYPE.LOADED,
});
