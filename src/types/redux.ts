import { Dictionary } from "@reduxjs/toolkit";

export type EntitiesReduxState<T> = {
  ids: number[];
  entities: Dictionary<T>;
};

export type RequestParams<QueryParams = {}, UrlParams = {}, BodyParams = {}> = {
  queryParams: QueryParams;
  urlParams: UrlParams;
  bodyParams: BodyParams;
};
