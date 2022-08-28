import { MESSAGE_TYPE } from "src/helpers/constants";
import { FoundedMessage } from "src/types/backendResponses";

export function getMessageType(message: FoundedMessage, currentUserId: string) {
  if (currentUserId === message.from) {
    return MESSAGE_TYPE.OUTGOING;
  }
  return MESSAGE_TYPE.INCOMING;
}

export function removeDuplicatesFromMessages(messages: FoundedMessage[]) {
  const uniqueIds = Array.from(new Set(messages.map((it) => it.id)));
  return uniqueIds.map(
    (id) => messages[messages.findIndex((msg) => msg.id === id)]
  );
}

export function sortMessagesByDatetime(messages: FoundedMessage[]) {
  const messagesCopy: FoundedMessage[] = JSON.parse(JSON.stringify(messages));
  return messagesCopy.sort((a, b) => a.datetime - b.datetime);
}

export function getLastMessageFromMessagesArray(messages: FoundedMessage[]) {
  if (messages.length) {
    return messages[messages.length - 1];
  }
}
