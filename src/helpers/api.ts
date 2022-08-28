import axios, { AxiosError, AxiosInstance } from "axios";
import { message } from "antd";
import { store } from "src/redux/store";
import { hideLoaderAction, showLoaderAction } from "src/redux/loader/actions";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "Content-type": "application/json",
  },
});

const setInterceptors = (api: AxiosInstance) => {
  api.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error: AxiosError) {
      return Promise.reject(error?.response?.data);
    }
  );
};
setInterceptors(api);

export { api };

export enum ENDPOINTS {
  REGISTER = "user/register",
  LOGIN = "user/login",
  SEARCH_USERS = "user/search",
  WHO_AM_I = "user/whoAmI",

  SEND_MESSAGE = "message/send",

  GET_DIALOGS = "dialog/dialogs",
  GET_DIALOG = "dialog",
}

export async function tryCatchWrapper<T>(params: {
  asyncCode: () => Promise<T>;
  errorText?: string;
  successText?: string;
  withLoader?: boolean;
}): Promise<T | false> {
  const { asyncCode, successText, errorText, withLoader } = params;
  try {
    if (withLoader) {
      store.dispatch(showLoaderAction());
    }
    if (successText) {
      message.success(successText);
    }
    const asyncCodeResult = await asyncCode();
    if (withLoader) {
      store.dispatch(hideLoaderAction());
    }
    return asyncCodeResult;
  } catch (e) {
    if (withLoader) {
      store.dispatch(hideLoaderAction());
    }
    if (errorText) {
      message.error(`${errorText} ${JSON.stringify(e)}`);
    }

    return false;
  }
}
