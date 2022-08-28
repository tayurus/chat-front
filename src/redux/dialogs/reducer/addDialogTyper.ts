import { Action } from "redux";
import {
  DialogInState,
  dialogsAdapter,
  dialogsSelectors,
  DialogsState,
} from "src/redux/dialogs/reducer/dialogs.reducer";
import { AddDialogTyperParams } from "src/redux/dialogs/actions/addDialogTyper";

interface IAction extends Action {
  payload: AddDialogTyperParams;
}

export const addDialogTyper = (state: DialogsState, action: IAction) => {
  const { dialogId, userId, typing } = action.payload;
  const oldDialog: DialogInState = JSON.parse(
    JSON.stringify(dialogsSelectors.selectById(state, dialogId))
  );

  if (!oldDialog.typingUsers) {
    oldDialog.typingUsers = {};
  }
  oldDialog.typingUsers[userId] = typing;

  dialogsAdapter.updateOne(state, {
    id: dialogId,
    changes: oldDialog,
  });
};
