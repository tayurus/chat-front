import { appendUsersAction, updateUsersAction } from "src/redux/users/actions";
import { createReducer, createEntityAdapter } from "@reduxjs/toolkit";
import { EntitiesReduxState } from "../../../types/redux";
import { UserInfoInDialog } from "src/types/backendResponses";
import { appendUsers } from "./appendUsers";
import { updateUsers } from "./updateUsers";

type UserInState = UserInfoInDialog;
export type UsersState = EntitiesReduxState<UserInState>;

export const usersAdapter = createEntityAdapter<UserInState>({});
export const usersSelectors = usersAdapter.getSelectors();

const initialState: UsersState = { entities: {}, ids: [] };

export const usersReducer = createReducer(initialState, {
  [appendUsersAction.type]: appendUsers,
  [updateUsersAction.type]: updateUsers,
});
