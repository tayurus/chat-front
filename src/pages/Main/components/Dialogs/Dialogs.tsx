import React, { FC, useEffect, useState } from "react";
import classNames from "classnames/dedupe";
import { cn } from "src/helpers/bem";
import { Props } from "./DialogsProps";
import "./Dialogs.scss";
import { Avatar, Badge, Comment, Input } from "antd";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { PAGES } from "src/helpers/router";
import {
  FoundedUser,
  SearchUsersResponse,
  SearchUsersSuccessResponse,
  UserInfoInDialog,
} from "src/types/backendResponses";
import { api, ENDPOINTS, tryCatchWrapper } from "src/helpers/api";
import { UserSearch } from "./components";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { dialogsSelectors } from "src/redux/dialogs/reducer/dialogs.reducer";
import { getWhoAmI } from "src/redux/user/actions";
import { getDialogs } from "src/redux/dialogs/actions";
import { DEFAULT_EMPTY_STRING, NEW_DIALOG_ID } from "src/helpers/constants";
import { WebSocketModule } from "src/helpers/websocket";
import qs from "qs";
import { LOADING_TYPE } from "src/types/loading";
import { getLastMessageFromMessagesArray } from "src/helpers/message";
import { getUserFIOByData } from "src/helpers/user";
import { getAllDialogParticipantsExceptCurrentUser } from "src/helpers/dialog";
import { usersSelectors } from "src/redux/users/reducer/users.reducer";
import { appendUsersAction } from "src/redux/users/actions";

const b = cn("dialogs");

export const Dialogs: FC<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<null | SearchUsersResponse>(
    null
  );
  const dispatch = useAppDispatch();
  const { className } = props;
  const navigate = useNavigate();

  const state = useAppSelector((state) => state);
  const { id: currentUserId } = state.user;
  const dialogs = dialogsSelectors.selectAll(state.dialogs);
  const { dialogsLoading } = state.dialogs;

  useEffect(() => {
    dispatch(getWhoAmI());
    if (dialogsLoading === LOADING_TYPE.INITIAL) {
      dispatch(getDialogs({}));
    }
  }, []);

  useEffect(() => {
    if (currentUserId && currentUserId !== DEFAULT_EMPTY_STRING) {
      WebSocketModule.initialize(currentUserId);
    }
  }, [currentUserId]);

  useEffect(() => {
    tryCatchWrapper({
      asyncCode: async () => {
        if (searchQuery) {
          const result: SearchUsersSuccessResponse = await api.get(
            `${ENDPOINTS.SEARCH_USERS}?query=${searchQuery}`
          );
          setSearchResult(result);
          dispatch(appendUsersAction({ users: result }));
        }
      },
      errorText: "search error",
      withLoader: true,
    });
  }, [searchQuery]);

  const handleSearchResultClick = (userInfo: FoundedUser) => {
    const newDialogQueryParams = qs.stringify({
      toUserId: userInfo.id,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
    });
    navigate(`${PAGES.DIALOG}/${NEW_DIALOG_ID}?${newDialogQueryParams}`);
  };

  return (
    <div className={classNames(b(), className)}>
      <div className={b("search")}>
        <Input.Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.trim())}
        />
      </div>

      {searchQuery ? (
        <UserSearch
          items={searchResult}
          onUserClick={handleSearchResultClick}
        />
      ) : (
        dialogs.map((it) => {
          const receiverId = getAllDialogParticipantsExceptCurrentUser(
            it.participants,
            currentUserId
          ).id;

          const receiverData = (usersSelectors.selectById(
            state.users,
            receiverId
          ) || {}) as UserInfoInDialog;

          const receiverName = getUserFIOByData(receiverData);

          return (
            <div
              onClick={() => {
                navigate(`${PAGES.DIALOG}/${it.id}`);
              }}
              className={b("item")}
            >
              <Badge.Ribbon
                text="online"
                style={{ display: receiverData.online ? "block" : "none" }}
              >
                <Comment
                  author={<span>{receiverName}</span>}
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt={receiverName}
                    />
                  }
                  content={
                    <p className={b("content-preview")}>
                      {getLastMessageFromMessagesArray(it.messages)?.content}
                    </p>
                  }
                  datetime={
                    <span>
                      {moment(
                        getLastMessageFromMessagesArray(it.messages)?.datetime
                      ).format("MM-DD HH:mm:ss")}
                    </span>
                  }
                />
              </Badge.Ribbon>
            </div>
          );
        })
      )}
    </div>
  );
};
