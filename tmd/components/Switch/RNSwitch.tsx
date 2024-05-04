/**
 * Created by Widiana Putra on 05/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useState } from "react";
import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
// import { interpolateColor, withSpring } from "react-native-reanimated";
import { appTheme } from "../../core/theming";
import color from "color";
import { ColorVariantType } from "../../types/types";
import { interpolateColor } from "react-native-reanimated";

interface Props {
  value: boolean;
  thumbColor?: string;
  inActiveThumbColor?: string;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
  handleOnPress?: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  colorVariant?: ColorVariantType;
}

const RNSwitch = ({
                    activeTrackColor,
                    inActiveTrackColor,
                    thumbColor,
                    handleOnPress,
                    value,
                    disabled,
                    style,
                    colorVariant,
                    ...rest
                  }: Props) => {

  const { colors } = appTheme();

  const { switch: switchTheme } = appTheme();
  const usedColorVariant = colorVariant ?? switchTheme.colorVariant;
  let usedThumbColor, usedActiveTrackColor, usedInactiveTrackColor, inactiveThumbColor;
  if (!disabled) {
    usedThumbColor = colors.neutral.neutral_10;
    inactiveThumbColor = colors.neutral.neutral_10;
    usedActiveTrackColor = colors[usedColorVariant].main;
    usedInactiveTrackColor = colors.neutral.neutral_40;
  } else {
    usedThumbColor = color(colors.neutral.neutral_10).alpha(1).rgb().string();
    inactiveThumbColor = color(colors.neutral.neutral_50).alpha(1).rgb().string();
    usedActiveTrackColor = color(colors[usedColorVariant].main).alpha(0.4).rgb().string();
    usedInactiveTrackColor = colors.neutral.neutral_40;
  }
  const [switchTranslate] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    if (value) {
      Animated.spring(switchTranslate, {
        toValue: 20,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        useNativeDriver: true
      }).start();
    }
  }, [value, switchTranslate]);

  const interpolateBackgroundColor = {
    backgroundColor: switchTranslate.interpolate({
      inputRange: [0, 22],
      outputRange: [usedInactiveTrackColor, usedActiveTrackColor],
    }),
  };

  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    if (!disabled) {
      if (handleOnPress) {
        handleOnPress(!value);
      }
    }
  }, [handleOnPress, value]);

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback} style={style}>
      <Animated.View
        style={[styles.containerStyle, interpolateBackgroundColor]}
      >
        <Animated.View
          style={[
            styles.circleStyle,
            { backgroundColor: value ? usedThumbColor : inactiveThumbColor },
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
            // styles.shadowValue,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 18,
  },
  containerStyle: {
    width: 44,
    height: 24,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
  },
  shadowValue: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default RNSwitch;
