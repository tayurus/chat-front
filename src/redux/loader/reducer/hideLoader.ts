import { LoaderState } from 'src/redux/loader/reducer/loader.reducer';

export const hideLoader = (state: LoaderState): LoaderState => {
  return {
    ...state,
    visible: false,
  };
};
