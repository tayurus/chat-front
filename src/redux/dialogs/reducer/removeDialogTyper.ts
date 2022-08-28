import { Action } from "redux";
import {
  DialogInState,
  dialogsAdapter,
  dialogsSelectors,
  DialogsState,
} from "src/redux/dialogs/reducer/dialogs.reducer";
import { RemoveDialogTyperParams } from "src/redux/dialogs/actions";

interface IAction extends Action {
  payload: RemoveDialogTyperParams;
}

export const removeDialogTyper = (state: DialogsState, action: IAction) => {
  const { dialogId, userId } = action.payload;
  const oldDialog: DialogInState = JSON.parse(
    JSON.stringify(dialogsSelectors.selectById(state, dialogId))
  );

  if (!oldDialog.typingUsers) {
    oldDialog.typingUsers = {};
  }
  delete oldDialog.typingUsers[userId];

  dialogsAdapter.updateOne(state, {
    id: dialogId,
    changes: oldDialog,
  });
};
