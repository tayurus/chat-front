import {
  WebSocketMessage,
  WebSocketsEvents,
  WsNewMessageResponse,
  WsUserTypingResponse,
  WsUserUpdatedResponse,
} from "src/types/backendResponses";
import { store } from "src/redux/store";
import {
  addDialogTyperAction,
  appendMessageAction,
  removeDialogTyperAction,
} from "src/redux/dialogs/actions";
import { updateUsersAction } from "src/redux/users/actions";
import { WsUserTypingParams } from "src/types/backendParams";
import { REMOVE_DIALOG_TYPER_TIMEOUT } from "src/helpers/constants";

export const WebSocketModule: {
  socket: null | WebSocket;
  initialize: (userId: string) => void;
  usersTypingDescriptors: Record<string, NodeJS.Timeout>;
  sendUserTypingInfo: (params: WsUserTypingParams) => void;
  handleNewMessage: (data: WebSocketMessage<WsNewMessageResponse>) => void;
  handleUserUpdate: (data: WebSocketMessage<WsUserUpdatedResponse>) => void;
  handleUserTyping: (data: WebSocketMessage<WsUserTypingResponse>) => void;
} = {
  socket: null,
  usersTypingDescriptors: {},
  initialize(userId) {
    this.socket = new WebSocket(
      `${process.env.REACT_APP_BACKEND_WEBSOCKET_URL!}/${userId}`
    );

    this.socket!.onmessage = (message) => {
      const parsedMessage: WebSocketMessage<any> = JSON.parse(message.data);
      console.log("MESSAGE = ", parsedMessage);
      if (parsedMessage.type === WebSocketsEvents.NEW_MESSAGE) {
        this.handleNewMessage(parsedMessage);
      }
      if (parsedMessage.type === WebSocketsEvents.USER_UPDATE) {
        this.handleUserUpdate(parsedMessage);
      }
      if (parsedMessage.type === WebSocketsEvents.USER_TYPING) {
        this.handleUserTyping(parsedMessage);
      }
    };
  },

  handleNewMessage(message) {
    store.dispatch(appendMessageAction(message.data));
  },

  handleUserUpdate(message) {
    store.dispatch(
      updateUsersAction({
        users: [
          {
            id: message.data.userId,
            ...message.data.changes,
          },
        ],
      })
    );
  },

  handleUserTyping(message) {
    const {
      data: { typingType, dialogId, userId },
    } = message;

    store.dispatch(
      addDialogTyperAction({ dialogId, typing: typingType, userId })
    );
    clearTimeout(this.usersTypingDescriptors[userId]);
    this.usersTypingDescriptors[userId] = setTimeout(
      () => store.dispatch(removeDialogTyperAction({ dialogId, userId })),
      REMOVE_DIALOG_TYPER_TIMEOUT
    );
  },

  sendUserTypingInfo(params) {
    const message: WebSocketMessage<WsUserTypingParams> = {
      type: WebSocketsEvents.USER_TYPING,
      data: params,
    };
    this.socket?.send(JSON.stringify(message));
  },
};
