import { usersAdapter, usersSelectors, UsersState } from "./users.reducer";
import { Action } from "redux";
import { UpdateUsersParams } from "src/redux/users/actions";

interface IAction extends Action {
  payload: UpdateUsersParams;
}

export const updateUsers = (state: UsersState, action: IAction) => {
  action.payload.users.forEach((it) => {
    const userDataBeforeUpdate = usersSelectors.selectById(state, it.id);
    usersAdapter.updateOne(state, {
      id: it.id,
      changes: { ...userDataBeforeUpdate, ...it },
    });
  });
};
