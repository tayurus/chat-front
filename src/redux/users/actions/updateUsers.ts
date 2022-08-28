import { createAction } from "@reduxjs/toolkit";
import { UserInfoInDialog } from "src/types/backendResponses";

export type UpdateUsersParams = {
  users: Array<{ id: string } & Partial<UserInfoInDialog>>;
};
export const updateUsersAction =
  createAction<UpdateUsersParams>("users/updateUsers");
