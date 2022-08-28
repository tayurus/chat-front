import { usersAdapter, UsersState } from "./users.reducer";
import { Action } from "redux";
import { AppendUsersParams } from "src/redux/users/actions";

interface IAction extends Action {
  payload: AppendUsersParams;
}

export const appendUsers = (state: UsersState, action: IAction) => {
  usersAdapter.upsertMany(state, action.payload.users);
};
