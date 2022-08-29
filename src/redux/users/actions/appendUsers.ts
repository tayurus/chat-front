import { createAction } from "@reduxjs/toolkit";
import { FoundedUser, UserInfoInDialog } from "src/types/backendResponses";

export type AppendUsersParams = { users: UserInfoInDialog[] | FoundedUser[] };
export const appendUsersAction =
  createAction<AppendUsersParams>("users/appendUsers");
