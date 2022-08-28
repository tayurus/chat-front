import {
  dialogsAdapter,
  dialogsSelectors,
  DialogsState,
} from "src/redux/dialogs/reducer/dialogs.reducer";
import { Action } from "redux";
import { WsNewMessageResponse } from "src/types/backendResponses";
import {
  removeDuplicatesFromMessages,
  sortMessagesByDatetime,
} from "src/helpers/message";

interface IAction extends Action {
  payload: WsNewMessageResponse;
}

export const appendMessage = (state: DialogsState, action: IAction) => {
  const { dialogId, message, participants } = action.payload;
  const dialog = dialogsSelectors.selectById(state, dialogId);
  // если диалог есть в редаксе - просто обновим его
  if (dialog) {
    dialogsAdapter.updateOne(state, {
      id: dialogId,
      changes: {
        messages: sortMessagesByDatetime(
          removeDuplicatesFromMessages([
            ...dialog.messages,
            action.payload.message,
          ])
        ),
      },
    });
  } else {
    // а если диалога не было, то это пришло первое сообщение в нем (за все время),
    // надо создать диалог с нуля в редаксе
    dialogsAdapter.upsertOne(state, {
      id: dialogId,
      messages: [message],
      participants: participants!,
    });
  }
};
