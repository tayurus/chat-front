import { createAction } from "@reduxjs/toolkit";
import { UserInfoInDialog } from "src/types/backendResponses";

export type AppendUsersParams = { users: UserInfoInDialog[] };
export const appendUsersAction =
  createAction<AppendUsersParams>("users/appendUsers");
