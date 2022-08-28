import { useLocation } from "react-router-dom";
import React from "react";
import qs from "qs";

export enum PAGES {
  DIALOGS = "/",
  REGISTER = "/register",
  LOGIN = "/login",
  DIALOG = "/dialog",
}

export function useQuery<T extends Record<string, string>>(): T {
  const { search } = useLocation();
  const clearedSearch = search.replace("?", "");

  return React.useMemo(() => qs.parse(clearedSearch) as T, [clearedSearch]);
}
