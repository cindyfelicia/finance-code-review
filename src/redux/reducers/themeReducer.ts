import { DefaultTheme } from '../../../tmd';
import { Theme } from '../../../tmd/types/types';

export type ThemeState = {
  theme?: Theme;
};

const initialState: ThemeState = {
  theme: DefaultTheme,
};

const themeReducer = (state: ThemeState = initialState, action: any) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
};

export default themeReducer;
