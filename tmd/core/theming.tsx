import { createTheming } from "@callstack/react-theme-provider";
import DefaultTheme from "../styles/theme/DefaultTheme";
import { Theme } from "../types/types";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export const { ThemeProvider, withTheme } =
  createTheming<Theme>(DefaultTheme as Theme);

export const appTheme = () => useContext(ThemeContext).theme ?? DefaultTheme;
