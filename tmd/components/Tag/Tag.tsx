/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { appTheme } from "../../core/theming";
import { StyleProp, View, ViewStyle } from "react-native";
import Typography, { TypographyType } from "../Typography/Typography";
import Icon, { IconProps } from "../Icon";
import { ColorVariantType } from "../../types/types";


export type TagSize = "sm" | "md" | "lg"
export type TagShape = "rect" | "rounded"
export type TagVariant = "default" | "outlined" | "filled"
const ROUNDED_SHAPE = 32;
const RECT_SHAPE = 4;

interface Props {
  colorVariant?: ColorVariantType;
  variant?: TagVariant;
  size?: TagSize;
  text?: string;
  shape?: TagShape;
  textStyle?: StyleProp<Text>;
  prefixIcon?: IconProps;
  suffixIcon?: IconProps;
  style?: StyleProp<ViewStyle>;
}

export default function Tag({ size, colorVariant, text, shape, variant, ...rest }: Props) {
  const theme = appTheme();
  const { colors, roundness, tag } = theme;

  const usedSize = size ?? tag?.size;
  let typoType: TypographyType;
  switch (usedSize) {
    case "sm": {
      typoType = "label3";
      break;
    }
    case "md": {
      typoType = "label2";
      break;
    }
    case "lg": {
      typoType = "label1";
      break;
    }
  }

  let borderRadius = roundness;
  if ((shape && shape == "rounded")) {
    borderRadius = ROUNDED_SHAPE;
  } else if (!shape && tag.shape == "rounded") {
    borderRadius = ROUNDED_SHAPE;
  }

  const usedColorVariant = colorVariant ?? tag?.colorVariant;
  let bgColor = colors[usedColorVariant]["surface"];
  let textColor = colors[usedColorVariant]["main"];
  let borderColor = colors[usedColorVariant]["surface"];

  const usedVariant = variant ?? tag.variant;

  switch (usedVariant) {
    case "default": {
      bgColor = colors[usedColorVariant]["surface"];
      textColor = colors[usedColorVariant]["main"];
      borderColor = colors[usedColorVariant]["surface"];
      break;
    }
    case "outlined": {
      bgColor = colors[usedColorVariant]["surface"];
      textColor = colors[usedColorVariant]["main"];
      borderColor = colors[usedColorVariant]["main"];
      break;
    }
    case "filled": {
      bgColor = colors[usedColorVariant]["main"];
      textColor = colors.neutral.neutral_10;
      borderColor = colors[usedColorVariant]["main"];
      break;
    }
  }


  return (
    <View style={
      [
        {
          backgroundColor: bgColor,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: borderRadius,
          paddingVertical: 4,
          paddingHorizontal: 8,
          alignSelf: "baseline",
          borderColor: borderColor,
          borderWidth: 1,
        },
        rest.style,
      ]}>
      {
        rest.prefixIcon &&
        <View style={{ marginRight: 4 }}>
          <Icon
            color={rest.prefixIcon.color ?? textColor}
            size={rest.prefixIcon.size ?? 16}
            {...rest.prefixIcon}
          />
        </View>
      }
      <Typography
        type={typoType}
        style={[
          {
            color: textColor,
          },
          rest.textStyle,
        ]}
      >{text}</Typography>

      {
        rest.suffixIcon &&
        <View style={{ marginLeft: 4 }}>
          <Icon
            color={rest.suffixIcon.color ?? textColor}
            size={rest.suffixIcon.size ?? 16}
            {...rest.suffixIcon}
          />
        </View>
      }

    </View>
  );
}
