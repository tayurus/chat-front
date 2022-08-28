import { UserInfoInDialog } from "src/types/backendResponses";

export function getAllDialogParticipantsExceptCurrentUser(
  dialogParticipants: UserInfoInDialog[],
  currentUserId: string
) {
  // if (dialogParticipants.length <= 2) {
  return dialogParticipants.filter((it) => it.id !== currentUserId)[0];
  // }

  // TODO: предусмотреть, что участников диалога может быть несколько
  // return "";
}
