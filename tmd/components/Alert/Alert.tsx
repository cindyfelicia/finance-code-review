/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Animated, LayoutAnimation, Platform, StyleProp, UIManager, View, ViewStyle } from "react-native";
import { appTheme } from "../../core/theming";
import Icon from "../Icon";
import Typography from "../Typography/Typography";
import IconButton from "../IconButton";
import { ColorVariantType } from "../../types/types";
import { Button } from "../../index";

export type AlertType = "basic" | "outlined" | "filled"

interface Props {
  style?: StyleProp<ViewStyle>;
  colorVariant?: ColorVariantType;
  type?: AlertType;
  title?: string;
  description: string;
  dismissible?: boolean;
  iconProps?: ComponentProps<typeof Icon>;
  showActionButton?: boolean;
  actionButtonTitle?: string;
  onPressActionButton?: () => void;
  actionButtonProps?: ComponentProps<typeof Button>;
}

export default function Alert({
                                title, description, dismissible, type, colorVariant, iconProps,
                                showActionButton, actionButtonProps, actionButtonTitle, onPressActionButton,
                                ...rest
                              }: Props) {
  const { colors, roundness, alert } = appTheme();
  const [isShown, setIsShown] = useState(true);
  let backgroundColor = colors.info.surface;
  let iconName = "information-circle";
  let textColor = colors.neutral.neutral_100;
  let iconColor = colors.info.main;
  const usedVariant = colorVariant ?? alert.colorVariant;
  const usedType = type ?? alert.type;
  iconColor = colors[usedVariant].main;
  backgroundColor = colors[usedVariant].surface;
  switch (usedVariant) {
    case "success": {
      iconName = "checkmark-circle";
      break;
    }
    case "warning": {
      iconName = "warning";
      break;
    }
    case "danger": {
      iconName = "alert-circle";
      break;
    }
    case "info": {
      iconName = "information-circle";
      break;
    }
  }

  useEffect(() => {
    if (dismissible) {
      if (Platform.OS === "android") {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsShown(false);
  };

  const isFilled = usedType === "filled";
  if (usedType == "filled") {
    backgroundColor = iconColor;
    textColor = colors.neutral.neutral_10;
    iconColor = colors.neutral.neutral_10;
  }


  return (
    <>
      {isShown &&
        <View
          style={[
            {
              backgroundColor: backgroundColor,
              padding: 8,
              borderRadius: roundness,
            },
            usedType == "outlined" ? {
              borderWidth: 1,
              borderColor: iconColor,
            } : {},
            rest.style,
          ]}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",

            }}>
            <View style={{ marginRight: 6 }}>
              <Icon
                icon={iconProps?.icon ?? iconName}
                color={iconProps?.color ?? iconColor}
                size={iconProps?.size ?? 18}
              />
            </View>
            <View
              style={{
                flexGrow: 1,
                flexDirection: "column",
                flex: 1,
              }}>
              {
                title &&
                <Typography
                  type={"label1"}
                  style={{
                    color: textColor,
                  }}
                >
                  {title}
                </Typography>
              }

              <Typography
                type={"body3"}
                style={{
                  color: textColor,
                }}
              >
                {description}
              </Typography>
            </View>

            {
              showActionButton ?
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  buttonStyle={[
                    {
                      backgroundColor: "transparent",
                    },
                    usedType == "filled" ? {
                      borderColor: colors.neutral.neutral_10,
                    } : {},
                  ]}
                  style={{
                    marginHorizontal: 2,
                  }}
                  labelStyle={[
                    usedType == "filled" ? {
                      color: colors.neutral.neutral_10,
                    } : {},
                  ]}
                  colorVariant={colorVariant}
                  {...actionButtonProps}
                  onPress={onPressActionButton}
                >
                  {actionButtonTitle}
                </Button>
                : <></>
            }

            <View>
              {
                (dismissible) &&
                <IconButton
                  variant={"tertiary"}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  fitIcon
                  onPress={() => {
                    // setIsShown(false);
                    handleDismiss();
                  }}

                  color={usedType == "filled" ? colors.neutral.neutral_10 : colors.neutral.neutral_80}
                  size={22}
                  icon={"close"} />
              }
            </View>

          </View>


        </View>
      }
    </>
  );
}
