/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import Typography, { TypographyType } from "../../Typography/Typography";
import * as React from "react";
import { Text as NativeText, View } from "react-native";
import { appTheme } from "../../../core/theming";

interface Props {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  typographyType?: TypographyType;
}

export default function LabelInput({
                                     label,
                                     disabled = false,
                                     required,
                                     typographyType = "label1",
                                     ...props
                                   }: Props & React.ComponentProps<typeof Typography>) {
  const theme = appTheme();
  return <View style={
    [
      { flexDirection: "row" },
    ]}>
    <Typography
      type={typographyType}
      style={{
        color: disabled ? theme.colors.neutral.neutral_60 : theme.colors.neutral.neutral_90,
      }}
      {...props}
    >
      {label}
    </Typography>
    {
      required &&
      <Typography style={{ color: theme.colors.danger.main, marginLeft: 1 }}>*</Typography>
    }
  </View>;
}
