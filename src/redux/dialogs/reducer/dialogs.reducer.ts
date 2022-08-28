import {
  getDialogs,
  getDialog,
  appendMessageAction,
  updateDialogAction,
  removeDialogTyperAction,
  addDialogTyperAction,
} from "../actions";
import { createReducer, createEntityAdapter } from "@reduxjs/toolkit";
import { LOADING_TYPE } from "../../../types/loading";
import { EntitiesReduxState } from "../../../types/redux";
import { DialogInResponse } from "../../../types/backendResponses";

import {
  getDialogsRequest,
  getDialogsSuccess,
  getDialogsFailed,
} from "./getDialogs";

import {
  getDialogRequest,
  getDialogSuccess,
  getDialogFailed,
} from "./getDialog";

import { appendMessage } from "./appendMessage";
import { updateDialog } from "./updateDialog";
import { UserTyping } from "src/types/backendAndFrontendCommonTypes/userTyping";
import { addDialogTyper } from "./addDialogTyper";
import { removeDialogTyper } from "./removeDialogTyper";

// пользователь, который печатает в диалоге
export type DialogInState = DialogInResponse & {
  typingUsers?: Record<string, UserTyping>;
};

export type DialogsState = EntitiesReduxState<DialogInState> & {
  dialogsLoading: LOADING_TYPE;
  dialogLoading: LOADING_TYPE;
};

export const dialogsAdapter = createEntityAdapter<DialogInState>({});
export const dialogsSelectors = dialogsAdapter.getSelectors();

const initialState: DialogsState = {
  dialogsLoading: LOADING_TYPE.INITIAL,
  dialogLoading: LOADING_TYPE.INITIAL,
  entities: {},
  ids: [],
};

export const dialogsReducer = createReducer(initialState, {
  [getDialogs.pending.toString()]: getDialogsRequest,
  [getDialogs.fulfilled.toString()]: getDialogsSuccess,
  [getDialogs.rejected.toString()]: getDialogsFailed,

  [getDialog.pending.toString()]: getDialogRequest,
  [getDialog.fulfilled.toString()]: getDialogSuccess,
  [getDialog.rejected.toString()]: getDialogFailed,

  [appendMessageAction.type.toString()]: appendMessage,

  [updateDialogAction.type.toString()]: updateDialog,

  [addDialogTyperAction.type]: addDialogTyper,

  [removeDialogTyperAction.type]: removeDialogTyper,
});
