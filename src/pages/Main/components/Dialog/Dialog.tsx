import React, { FC, useEffect } from "react";
import { cn } from "src/helpers/bem";
import { Props } from "./DialogProps";
import "./Dialog.scss";
import { api, tryCatchWrapper } from "src/helpers/api";
import { SendMessageBodyParams } from "src/types/backendParams";
import {
  FoundedMessage,
  SendMessageSuccessResponse,
  UserInfoInDialog,
} from "src/types/backendResponses";
import {
  Message,
  MessageControls,
} from "src/pages/Main/components/Dialog/components";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { getMessageType } from "src/helpers/message";
import { useNavigate, useParams } from "react-router-dom";
import { getDialog } from "src/redux/dialogs/actions";
import {
  DialogInState,
  dialogsSelectors,
} from "src/redux/dialogs/reducer/dialogs.reducer";
import { NewDialog } from "src/types/newDialog";
import { NEW_DIALOG_ID } from "src/helpers/constants";
import { PAGES, useQuery } from "src/helpers/router";
import { LOADING_TYPE } from "src/types/loading";
import { getUserFIOByData } from "src/helpers/user";
import { getAllDialogParticipantsExceptCurrentUser } from "src/helpers/dialog";
import { usersSelectors } from "src/redux/users/reducer/users.reducer";
import {
  BASE_ROUTES,
  MESSAGE_ROUTES,
} from "src/types/backendAndFrontendCommonTypes/routes";

const b = cn("dialog");

export const Dialog: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const currentUserId = state.user.id;
  const { dialogsLoading } = state.dialogs;
  const navigate = useNavigate();

  const { dialogId } = useParams<{ dialogId: string }>();
  const { toUserId, first_name, last_name } = useQuery<NewDialog>();
  const isNewDialog = dialogId === NEW_DIALOG_ID;

  let messages: FoundedMessage[] = [];
  let currentDialog: DialogInState | NewDialog | undefined;
  if (dialogId && !isNewDialog) {
    currentDialog = dialogsSelectors.selectById(state.dialogs, dialogId);
    if (currentDialog) {
      messages = currentDialog.messages;
    }
  } else {
    currentDialog = { toUserId, first_name, last_name };
  }

  useEffect(() => {
    if (dialogId && !isNewDialog && dialogsLoading === LOADING_TYPE.LOADED) {
      dispatch(
        getDialog({
          queryParams: { offset: "0", limit: "100" },
          urlParams: { dialogId: dialogId },
          bodyParams: {},
        })
      );
    }
  }, [dialogId, dialogsLoading]);

  const getDialogId = () => {
    if (currentDialog && "id" in currentDialog) {
      return currentDialog.id;
    }

    return undefined;
  };

  async function handleSendMessage(content: string) {
    const dialogId = await sendMessage(content);
    if (dialogId) {
      navigate(`${PAGES.DIALOG}/${dialogId}`, { replace: true });
      return dialogId;
    }

    return "";
  }

  const sendMessage = async (content: string) => {
    return tryCatchWrapper<string>({
      asyncCode: async () => {
        const response: SendMessageSuccessResponse = await api.post<
          any,
          any,
          SendMessageBodyParams
        >(`${BASE_ROUTES.MESSAGE}${MESSAGE_ROUTES.SEND}`, {
          message: content,
          toUserId: isNewDialog
            ? (currentDialog as NewDialog).toUserId
            : undefined,
          dialogId: getDialogId(),
        });
        return response.dialogId;
      },
      successText: "Сообщение отправлено",
      errorText: "Не удалось отправить сообщение",
      withLoader: true,
    });
  };

  const getReceiverName = () => {
    if (currentDialog) {
      if ("participants" in currentDialog) {
        return getUserFIOByData(
          getAllDialogParticipantsExceptCurrentUser(
            currentDialog.participants,
            currentUserId
          ) as UserInfoInDialog
        );
      } else {
        return getUserFIOByData(currentDialog);
      }
    }
  };

  function getDialogStatus() {
    if (!isNewDialog) {
      const { typingUsers } = currentDialog as DialogInState;
      const somebodyTypes = Boolean(
        typingUsers && Object.keys(typingUsers).length
      );
      if (somebodyTypes) {
        const typingUsersFIOs = Object.keys(typingUsers!).reduce(
          (acc: string[], typerUserId) => {
            const typer = usersSelectors.selectById(state.users, typerUserId);
            if (typer) {
              return [...acc, getUserFIOByData(typer)];
            }
            return acc;
          },
          []
        );

        const typersMoreThanOne = typingUsersFIOs.length > 1;

        return `${typingUsersFIOs.join(",")} ${
          typersMoreThanOne ? "печатают" : "печатает"
        }`;
      }
    }
  }

  return currentDialog ? (
    <div className={b()}>
      <div className={b("user-info")}>
        <div
          className={b("user-img")}
          style={{
            background: `url(https://brithouse.ru/wp-content/uploads/2015/07/flat-face-icon-23.png) no-repeat center / contain`,
          }}
        />
        <div className={b("user-wrapper")}>
          <span className={b("user-name")}>Chat with {getReceiverName()}</span>
          <br />
          <span className={b("user-status")}>
            {/*{status === "online" ? "online" : "offline"}*/}
            {/*online*/}
            {getDialogStatus()}
          </span>
        </div>
      </div>

      <div className={b("messages")}>
        {(messages as FoundedMessage[]).map((message) => {
          return (
            <Message
              type={getMessageType(message, currentUserId)}
              content={message.content}
              datetime={message.datetime}
            />
          );
        })}
      </div>

      <MessageControls
        dialogId={getDialogId()}
        sendMessage={handleSendMessage}
      />
    </div>
  ) : null;
};
