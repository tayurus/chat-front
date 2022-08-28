import { createAction } from "@reduxjs/toolkit";
import { DialogInState } from "src/redux/dialogs/reducer/dialogs.reducer";

export type UpdateDialogParams = { id: string } & Partial<DialogInState>;
export const updateDialogAction = createAction<UpdateDialogParams>(
  "dialogs/updateDialog"
);
