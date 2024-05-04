/**
 * Created by Widiana Putra on 14/11/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useRef, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, Platform, TouchableOpacity, View } from "react-native";
import { appTheme } from "../../core/theming";
import { Icon, Stack } from "../../index";
import Typography from "../Typography/Typography";
import LinearGradient from "react-native-linear-gradient";
import color from "color";

export type BottomNavVariantType = "default" | "highlight" | "indicator";

interface Props {
  variant?: BottomNavVariantType;
}


const ScaleViewAnimation = ({ isVisible, children }: any) => {
  const [view, setView] = useState(children);
  const animation = new Animated.Value(0);
  const inputRange = [0, 0.8, 1];
  const outputRange = [0.8, 1.1, 1];
  const scale = animation.interpolate({ inputRange, outputRange });

  useEffect(() => {
    if (isVisible) {
      setView(children);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setView(null);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      {view}
    </Animated.View>
  );
};


function TabBarIcon({
  options,
  isFocused,
  variant = "default",
}: { options: any, isFocused: boolean, variant?: BottomNavVariantType }) {
  const { colors } = appTheme();
  const usedColor = isFocused ? colors.primary.main : colors.neutral.neutral_60;

  const widthAnimation = useRef(new Animated.Value(0)).current;

  // const widthInterpolate = widthAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 60],
  // })

  useEffect(() => {
    if (variant == "highlight") {
      if (isFocused) {
        Animated.timing(widthAnimation, {
          useNativeDriver: true,
          toValue: 1,
          duration: 300,
        }).start();
      } else {
        Animated.timing(widthAnimation, {
          useNativeDriver: true,
          toValue: 0,
          duration: 300,
        }).start();
      }
    }
  }, [isFocused, variant]);


  return (
    <Stack style={{ width: "100%", justifyContent: "center", alignItems: "center", position: "relative" }}>
      {
        <>
          {
            variant == "highlight" &&
            <Animated.View style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Animated.View style={{
                height: "100%",
                width: "60%",
                backgroundColor: colors.primary.surface,
                transform: [{ scaleX: widthAnimation }],
                borderRadius: 32,

              }}>

              </Animated.View>

            </Animated.View>
          }

          <View
            style={{
              alignItems: "center",
              paddingVertical: 2,
              width: "60%",
            }}
          >
            {
              isFocused ?
                // <ScaleViewAnimation isVisible={isFocused}>
                <Icon source={options.source} icon={options.icon} color={usedColor} size={24} />
                // </ScaleViewAnimation>
                : <Icon source={options.source} icon={options.inactiveIcon ?? options.icon} color={usedColor} size={24} />

            }
          </View>


        </>

      }
    </Stack>
  );
}


export default function BottomNavbar({
  variant = "default",
  state,
  descriptors,
  navigation,
}: Props & BottomTabBarProps) {
  const { colors } = appTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 8,
        backgroundColor: colors.surface.surface_300,
        shadowOffset: {
          width: 0,
          height: -8,
        },
        shadowColor: "#000000",
        elevation: 8,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              { flex: 1, alignItems: "center", position: "relative" },
              Platform.OS === "ios" ? { paddingBottom: 8} : {}
            ]}
          >
            {/* {
              variant == "indicator" &&
              <>
                {
                  isFocused &&
                  <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    alignItems: "center",
                    flex: 1,
                  }}>
                    <LinearGradient
                      colors={[color(colors.primary.main).alpha(0.1).rgb().string(), colors.neutral.neutral_10]}
                      style={{
                        width: "90%",
                        flex: 1,
                        height: 40,
                      }} />
                  </View>
                }
                </>
            } */}

            <View style={{
              paddingVertical: 10,
              alignItems: "center",
              width: "100%",
            }}>

              <TabBarIcon options={options} isFocused={isFocused} variant={variant} />
              <Typography
                type={"label2"}
                style={[
                  (options?.icon == undefined && variant == "indicator") ? {
                    position: 'absolute',
                    top: 20
                  } : {},
                  {
                    color: isFocused ? colors.primary.main : colors.neutral.neutral_60,
                    marginTop: 2,
                  }
                ]}>
                {label}
              </Typography>
            </View>

            {
              variant == "indicator" &&
              <>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    alignItems: "center",
                  }}
                >
                  <View style={{
                    width: "80%",
                    height: 4,
                    borderBottomStartRadius: 16,
                    borderBottomEndRadius: 16,
                    backgroundColor: isFocused ? colors.primary.main : "transparent",
                  }} />
                </View>
              </>
            }

          </TouchableOpacity>
        );
      })}
    </View>
  );
}
