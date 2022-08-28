import { showLoaderAction, hideLoaderAction } from './../actions';
import { createReducer } from '@reduxjs/toolkit';
import { showLoader } from './showLoader';
import { hideLoader } from './hideLoader';

export type LoaderState = {
  visible: boolean;
};

const initialState: LoaderState = { visible: false };

export const loaderReducer = createReducer(initialState, {
  [showLoaderAction.type.toString()]: showLoader,
  [hideLoaderAction.type.toString()]: hideLoader,
});
