import React, { useState, useRef, useImperativeHandle } from "react";
import { IconButton, Stack, Surface, appTheme } from "../../index";
import Color from "color";
import { goBack, navigationRef } from "../../../src/navigations/RootNavigation";
import { View, TextInput } from "react-native";
import TextField from "../TextInput/TextField";
import Typography from "../Typography/Typography";
import { useLocale } from "../../../src/providers/LocaleProvider";

interface Props {
  title?: string;
  backgroundColor?: string;
  center?: boolean;
  backable?: boolean;
  elevation?: number;
  searchPlaceholder?: string;
  onTextChange?: (text: string) => void;
  onPressSearch?: (text: string) => void;
}

export const SearchToolbar = React.forwardRef((props: Props, ref) => {
    const {
      title,
      backgroundColor,
      backable = true,
      center,
      elevation,
      onPressSearch, onTextChange, searchPlaceholder,
    } = props;
  const { colors, toolbar } = appTheme();
  const { t } = useLocale();
  const usedBg = backgroundColor || colors.surface.surface_300;
  const isLight = Color(usedBg).isLight();
  const usedTitleColor = colors.neutral.neutral_100;
  const isShowBack = backable && navigationRef.canGoBack();
  const [iconViewWidth, setIconViewWidth] = useState(0);
  const [actionButtonWidth, setActionButtonWidth] = useState(0);
  const usedElevation = elevation || toolbar.elevation;
  const textFieldRef = useRef<TextInput | null>(null);

  const resetSearch = () => {
    if (textFieldRef.current) {
      textFieldRef.current.clear();
    }
  }

  useImperativeHandle(ref, () => ({
    resetSearch,
  }));

  return (
    <Surface elevation={usedElevation}>
      <Stack>
        {
          title &&
          <Stack
            spacing={16}
            direction={"row"}
            items={"center"}
            style={{
              backgroundColor: usedBg,
              paddingHorizontal: 16,
              paddingVertical: 12,
              // paddingVertical: isShowBack ? 12 : 16,
            }}>
            {
              isShowBack &&
              (
                <View onLayout={(event) => {
                  setIconViewWidth(event.nativeEvent.layout.width);
                }}>
                  <IconButton
                    shape={"rounded"}
                    onPress={() => {
                      goBack();
                    }}
                    fitIcon={false}
                    icon={"arrow-back"} color={usedTitleColor} style={{
                      backgroundColor: "transparent",
                      marginLeft: -8,
                    }} />
                </View>
              )
            }

            <Stack
              direction={"column"}
              spacing={2}
              style={
                [
                  { flex: 1 },
                  center && { alignItems: "center", justifyContent: "center" },
                  (isShowBack && center) && {
                    marginLeft: -iconViewWidth - 16,
                  },
                ]
              }>
              <Typography
                numberOfLines={1}
                ellipsizeMode={"tail"}
                type={"title2"}
                style={{ color: usedTitleColor }}>{title}</Typography>
            </Stack>

          </Stack>
        }
        <Stack
          spacing={8}
          direction={"row"}
          items={"center"}
          style={{
            backgroundColor: usedBg,
            paddingHorizontal: 16,
            paddingBottom: 12,
            paddingTop: title ? 0 : 12,
          }}>
          {
            (isShowBack && !title) &&
            (
              <View onLayout={(event) => {
                setIconViewWidth(event.nativeEvent.layout.width);
              }}>
                <IconButton
                  shape={"rounded"}
                  onPress={() => {
                    goBack();
                  }}
                  fitIcon={false}
                  icon={"arrow-back"} color={usedTitleColor} style={{
                    backgroundColor: "transparent",
                    marginLeft: -8,
                  }} />
              </View>
            )
          }

          <TextField
            ref={textFieldRef}
            placeholder={searchPlaceholder ?? t("search")}
            onInvokeTextChanged={(text) => {
              if (onTextChange) {
                onTextChange(text);
              }
            }}
            mode="filled"
            shape="rounded"
            returnKeyType={"search"}
            onEndEditing={(e) => {
              if (onPressSearch) {
                onPressSearch(e.nativeEvent.text ?? "");
              }
            }}
            search
            style={{
              flex: 1,
            }}
          />
 
        </Stack>
      </Stack>
    </Surface>
  );
}
);
