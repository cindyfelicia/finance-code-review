import DefaultTheme from "./DefaultTheme";
import type { Theme } from "../../types/types";

const DarkTheme: Theme = {
  ...DefaultTheme,
  name: "dark",
  textInput: {
    ...DefaultTheme.textInput,
    colorVariant: "primary",
  },
  colors: {
    ...DefaultTheme.colors,
    primary: {
      ...DefaultTheme.colors.primary,
      main: "#C3C4F3",
      hover: "#8888E8",
      pressed: "#6A6BE2",
      surface: "#26266E",
      border: "#333393",
      focus: "#C1C1FF33",
      content: "#191A49"
    },
    secondary: {
      ...DefaultTheme.colors.secondary,
      main: "#ECB0DB",
      hover: "#DA60B8",
      pressed: "#D039A6",
      surface: "#63084A",
      border: "#850B63",
      focus: "#ECB0DB33",
      content: "#420631"
    },
    danger: {
      ...DefaultTheme.colors.danger,
      main: "#EEBDBA",
      hover: "#DC7C76",
      pressed: "#D45B53",
      surface: "#651D18",
      border: "#872721",
      content: "#441310"
    },
    warning: {
      ...DefaultTheme.colors.warning,
      main: "#EED3B9",
      hover: "#DEA774",
      pressed: "#D59151",
      surface: "#663D17",
      border: "#89521F",
      content: "#44290F"
    },
    neutral: {
      ...DefaultTheme.colors.neutral,
      neutral_10: "#0A0A0A",
      neutral_20: "#404040",
      neutral_30: "#616161",
      neutral_40: "#757575",
      neutral_50: "#9E9E9E",
      neutral_60: "#C2C2C2",
      neutral_70: "#E0E0E0",
      neutral_80: "#EDEDED",
      neutral_90: "#F5F5F5",
      neutral_100: "#FFFFFF",
    },
  },
};

export default DarkTheme;
