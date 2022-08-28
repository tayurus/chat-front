import { createAction } from "@reduxjs/toolkit";

export type RemoveDialogTyperParams = {
  dialogId: string;
  userId: string;
};
export const removeDialogTyperAction = createAction<RemoveDialogTyperParams>(
  "dialogs/removeDialogTyper"
);
