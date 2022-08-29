import { createAsyncThunk } from "@reduxjs/toolkit";
import { WsNewMessageResponse } from "src/types/backendResponses";
import { dialogsSelectors } from "src/redux/dialogs/reducer/dialogs.reducer";
import { RootState } from "src/redux/store";
import { getDialog } from "src/redux/dialogs/actions/getDialog";

type AppendMessageReturn = WsNewMessageResponse;
type AppendMessageParams = WsNewMessageResponse;
export const appendMessageAction = createAsyncThunk<
  AppendMessageReturn,
  AppendMessageParams
>("dialogs/appendMessage", async (params, thunkApi) => {
  const { dialogId } = params;
  // проверим, есть ли данный диалог в редакс-хранилище
  const state = thunkApi.getState() as RootState;
  const dialogInStore = dialogsSelectors.selectById(state.dialogs, dialogId);
  // если нет - запросим его
  if (!dialogInStore) {
    thunkApi.dispatch(
      await getDialog({
        urlParams: { dialogId },
        queryParams: { offset: "0", limit: "0" },
        bodyParams: {},
      })
    );
  }

  // а потом просто вернем данные, которые пришли в action
  return params;
});
