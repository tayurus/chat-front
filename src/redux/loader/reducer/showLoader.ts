import { LoaderState } from 'src/redux/loader/reducer/loader.reducer';

export const showLoader = (state: LoaderState): LoaderState => {
  return {
    ...state,
    visible: true,
  };
};
