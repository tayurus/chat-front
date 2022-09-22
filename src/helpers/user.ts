import { BASE_ROUTES } from "src/types/backendAndFrontendCommonTypes/routes";

export function getUserFIOByData(params: {
  first_name: string;
  last_name: string;
}) {
  return `${params.last_name} ${params.first_name}`;
}

export function getUserProfilePhotoUrl(url: string) {
  return `${process.env.REACT_APP_BACKEND_URL}${BASE_ROUTES.FILE}${url}`;
}
