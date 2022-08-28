import { PAGES } from "src/helpers/router";
import { isAuthorized } from "src/helpers/auth";
import { Props } from "./PrivateRouteProps";
import { Navigate } from "react-router-dom";
import { FC } from "react";

// @ts-ignore
export const PrivateRoute: FC<Props> = (props) => {
  const { redirectPath = PAGES.LOGIN, children } = props;
  if (isAuthorized()) {
    return children;
  }

  return <Navigate to={redirectPath} replace />;
};
