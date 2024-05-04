import DefaultTheme from "./DefaultTheme";
import type { Theme } from "../../types/types";

const ForestTheme: Theme = {
  ...DefaultTheme,
  name: "forest",
  colors: {
    ...DefaultTheme.colors,
    primary: {
      ...DefaultTheme.colors.primary,
      main: "#89d205",
      surface: "#F2FCCB",
      border: "#E2FA98",
      hover: "#AEE33D",
      pressed: "#6FB403",
      focus: "#417901",
      content: "#000000",
    },
  },
};

export default ForestTheme;
