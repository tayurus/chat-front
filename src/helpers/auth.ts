import { getCookie } from "src/helpers/cookie";

export const isAuthorized = () => {
  return Boolean(getCookie("token"));
};
