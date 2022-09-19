import { UserTyping } from "src/types/backendAndFrontendCommonTypes/userTyping";
import { FILE_UPLOAD } from "src/types/backendAndFrontendCommonTypes/constants";

export type GetDialogsParams = {};

export type RegisterUserBodyParams = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginUserBodyParams = {
  email: string;
  password: string;
};

export type SendMessageBodyParams = {
  message: string;
  toUserId?: string;
  dialogId?: string;
};

export type SearchUsersQueryParams = {
  query: string;
};

export type GetDialogQueryParams = {
  offset: string;
  limit: string;
};

export type GetDialogUrlParams = {
  dialogId: string;
};

export type WsUserTypingParams = {
  dialogId: string;
  typingType: UserTyping;
};

export type UpdateUserPasswordParams = {
  oldPassword: string;
  newPassword: string;
};

export type UploadFileQueryParams = {
  type: FILE_UPLOAD;
};

export type UploadFileBodyParams = {
  file: Blob;
};
