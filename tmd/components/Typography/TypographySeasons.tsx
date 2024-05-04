/**
 * Created by Widiana Putra on 25/05/2022
 * Copyright (c) 2022 - Made with love
 */
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import * as React from "react";
import { appTheme } from "../../index";
import Text from "./Text";
import { normalizeSize } from "../../utils/normalizeSize";
import { TypographyType } from "./Typography";

interface Props {
  style?: StyleProp<TextStyle>;
  type?: TypographyType;
  color?: string;
}

const TypographySeasons = ({ style, type, color, ...rest }: Props & React.ComponentProps<typeof Text>) => {
  const theme = appTheme();

  let fontSize = 14;
  let lineHeight = 20;
  let spacing = 0;
  let fontTheme = theme.fonts.seasons.medium;
  const usedType = type ?? "h3";
  switch (usedType) {
    case "h1": {
      fontSize = 32;
      lineHeight = 40;
      spacing = 1.8;
      break;
    }
    case "h2": {
      fontSize = 28;
      lineHeight = 36;
      spacing = 1.8;
      break;
    }
    case "h3": {
      fontSize = 24;
      lineHeight = 32;
      spacing = 1.8;
      break;
    }
    case "title1": {
      fontSize = 20;
      lineHeight = 28;
      spacing = 1.8;
      break;
    }
    case "title2": {
      fontSize = 18;
      lineHeight = 26;
      spacing = 1.8;
      break;
    }
    case "title3": {
      fontSize = 16;
      lineHeight = 24;
      spacing = 1.8;
      break;
    }
    case "label1": {
      fontSize = 14;
      lineHeight = 20;
      spacing = 0.1;
      break;
    }
    case "label2": {
      fontSize = 12;
      lineHeight = 16;
      spacing = 0.1;
      break;
    }
    case "label3": {
      fontSize = 10;
      lineHeight = 14;
      spacing = 0.1;
      break;
    }

    case "body1": {
      fontSize = 16;
      lineHeight = 24;
      fontTheme = theme.fonts.seasons.regular;
      break;
    }
    case "body2": {
      fontSize = 14;
      lineHeight = 20;
      fontTheme = theme.fonts.seasons.regular;
      break;
    }
    case "body3": {
      fontSize = 12;
      lineHeight = 16;
      spacing = 0.1;
      fontTheme = theme.fonts.seasons.regular;
      break;
    }
    case "body4": {
      fontSize = 10;
      lineHeight = 14;
      spacing = 0.1;
      fontTheme = theme.fonts.seasons.regular;
      break;
    }
    case "button1": {
      fontSize = 16;
      lineHeight = 24;
      break;
    }
    case "button2": {
      fontSize = 14;
      lineHeight = 20;
      break;
    }
    case "button3": {
      fontSize = 12;
      lineHeight = 16;
      break;
    }
  }


  return (
    <Text
      {...rest}
      style={[
        {
          color: color ? color : theme.colors.text.brand,
          letterSpacing: spacing,
          fontSize: normalizeSize(fontSize),
          flexShrink: 1,
          ...fontTheme,
        },
        type ? {
          lineHeight: lineHeight,
        } : {},
        styles.text,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
});

export default TypographySeasons;
