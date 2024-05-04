/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */

export type SplashState = {
  isLoading: boolean;
};

const initialState: SplashState = {
  isLoading: true,
};

const splashReducer = (state: SplashState = initialState, action: any) => {
  switch (action.type) {
    case 'LOADING_SPLASH':
      return {
        ...state,
        isLoading: true,
      };
    case 'DONE_LOADING_SPLASH':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default splashReducer;
