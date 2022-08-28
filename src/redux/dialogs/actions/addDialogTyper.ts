import { createAction } from "@reduxjs/toolkit";
import { UserTyping } from "src/types/backendAndFrontendCommonTypes/userTyping";

export type AddDialogTyperParams = {
  dialogId: string;
  userId: string;
  typing: UserTyping;
};

export const addDialogTyperAction = createAction<AddDialogTyperParams>(
  "dialogs/addDialogTyper"
);
