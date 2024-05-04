import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../types/types";
import { dispatch, useAppSelector } from "../../src/redux/stores/store";
import { DefaultTheme } from "../index";
import { AppThemes } from "../styles/theme/AppThemes";


export type ThemeContextType = {
  changeTheme: (theme: Theme) => void;
  theme: Theme;
}

const initialState: ThemeContextType = {
  changeTheme: () => {

  },
  theme: DefaultTheme,
};

export const ThemeContext = React.createContext(initialState);
export const useTheme = () => useContext(ThemeContext);

interface Props {
  initialTheme: Theme;
}

const ThemeProvider = ({ children, initialTheme }: Props & any) => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  useEffect(() => {
    if (!theme) {
      changeTheme(initialTheme);
    }else{
      const selectedNewTheme = AppThemes.find((item) => item.name === theme.name);
      changeTheme(selectedNewTheme ?? DefaultTheme);
    }
  }, []);

  const changeTheme = (theme: Theme) => {
    dispatch({
      type: "CHANGE_THEME",
      payload: {
        theme: theme,
      },
    });
  };

  return <ThemeContext.Provider value={{
    changeTheme,
    theme,
  }}>
    {children}
  </ThemeContext.Provider>;
};

export default ThemeProvider;
