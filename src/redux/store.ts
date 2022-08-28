import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { dialogsReducer } from "./dialogs/reducer/dialogs.reducer";
import { userReducer } from "src/redux/user/reducer/user.reducer";
import { loaderReducer } from "src/redux/loader/reducer/loader.reducer";
import { usersReducer } from "src/redux/users/reducer/users.reducer";

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    user: userReducer,
    loader: loaderReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat(loggerMiddleware);
    }
    return getDefaultMiddleware();
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
