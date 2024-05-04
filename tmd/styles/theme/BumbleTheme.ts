import DefaultTheme from "./DefaultTheme";
import type { Theme } from "../../types/types";

const BumbleTheme: Theme = {
  ...DefaultTheme,
  name: "bumble",
  button: {
    ...DefaultTheme.button,
    shape: "rect",
  },
  colors: {
    ...DefaultTheme.colors,
    primary: {
      ...DefaultTheme.colors.primary,
      main: "#FC9918",
      surface: "#FFF6EB",
      border: "#F4CFA2",
      hover: "#FFAC41",
      pressed: "#CE7E15",
      focus: "#FC991833",
      content: "#000000",
    },
  },
};

export default BumbleTheme;
