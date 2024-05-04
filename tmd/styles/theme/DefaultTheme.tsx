import configureFonts from "../fonts";
import type { Theme } from "../../types/types";
import { defaultThemeColors } from "../defaultThemeColors";

const DefaultTheme: Theme = {
  name: "light",
  roundness: 8,
  colors: defaultThemeColors,
  dark: false,
  textInput: {
    mode: "flat",
    shape: "rect",
    colorVariant: "primary",
  },
  button: {
    variant: "primary",
    shape: "rounded",
    size: "md",
    colorVariant: "primary",
  },
  tag: {
    colorVariant: "primary",
    size: "md",
    shape: "rounded",
    variant: "default"
  },
  alert: {
    colorVariant: "info",
    type: "basic",
  },
  chip: {
    variant: "filled",
    shape: "rounded",
    colorVariant: "primary",
  },
  toast: {
    colorVariant: "default",
    shape: "rect",
  },
  skeleton: {
    animation: "pulse",
    borderRadius: 8,
  },
  avatar: {
    variant: "icon",
    size: "2xl",
  },
  badge: {
    size: "md",
    shape: "rounded",
    colorVariant: "danger",
  },
  toolbar: {
    elevation: 4,
    size: "sm",
  },
  otpInput: {
    colorVariant: "primary",
    mode: "contained",
  },
  checkbox: {
    colorVariant: "primary",
  },
  radioButton: {
    colorVariant: "primary",
  },
  switch: {
    colorVariant: "primary",
  },
  imagePicker: {
    colorVariant: "primary",
  },
  progressBar: {
    colorVariant: "primary",
  },
  tab: {
    colorVariant: "primary",
  },
  stepper: {
    colorVariant: "primary",
  },
  slider :{
    thumbType: "filled",
    thumbValuePosition: "bottom",
    colorVariant: "primary",
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
