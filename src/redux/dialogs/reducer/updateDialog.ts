import { Action } from "redux";
import { UpdateDialogParams } from "src/redux/dialogs/actions/updateDialog";
import {
  dialogsAdapter,
  dialogsSelectors,
  DialogsState,
} from "src/redux/dialogs/reducer/dialogs.reducer";

interface IAction extends Action {
  payload: UpdateDialogParams;
}

export const updateDialog = (state: DialogsState, action: IAction) => {
  const dialogId = action.payload.id;
  const oldDialog = dialogsSelectors.selectById(state, dialogId);
  dialogsAdapter.updateOne(state, {
    id: action.payload.id,
    changes: { ...oldDialog, ...action.payload },
  });
};
