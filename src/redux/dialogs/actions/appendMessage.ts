import { createAction } from "@reduxjs/toolkit";
import { WsNewMessageResponse } from "src/types/backendResponses";

export const appendMessageAction = createAction<WsNewMessageResponse>(
  "dialogs/appendMessage"
);
