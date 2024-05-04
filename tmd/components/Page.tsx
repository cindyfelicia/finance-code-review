/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, View } from "react-native";
import { appTheme } from "../core/theming";
import Color from "color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
  bgColor?: string;
}

export default function Page({ children, statusBarColor, bgColor }: Props) {
  const { colors } = appTheme();
  const statusBarHeight = StatusBar.currentHeight;
  const statusBarBackgroundColor = statusBarColor ?? colors.primary.main;
  const isLight = Color(statusBarBackgroundColor).isLight();


  const CStatusBar = ({ backgroundColor, ...props }: any) => (
    <>
    {
      <StatusBar backgroundColor={backgroundColor}
        translucent={false}
        barStyle={isLight ? "dark-content" : "light-content"} {...props} />
    }
    </>
  );

  return (
    <View style={{ flex: 1 }}>

      {/* iOS doesn't have a concept of a status bar bgColor */}
      {Platform.OS === "ios" ?
        <View style={{ height: statusBarHeight, backgroundColor: statusBarBackgroundColor }}>
          <SafeAreaView />
        </View>
        :
        <CStatusBar
          backgroundColor={statusBarBackgroundColor}
        />
      }

      <SafeAreaView style={[
        { flex: 1 },
        Platform.OS === 'ios' ? { marginBottom: -10 } : {},
        bgColor ? { backgroundColor: bgColor } : { backgroundColor: colors.surface.surface_100 },
      ]}>

        {children}

        {/* {
          Platform.OS === "ios" ?
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "height" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? useSafeAreaInsets().top : 0}
              style={{ flex: 1, }}

            >
              {children}
            </KeyboardAvoidingView>
            : <>
              {children}
            </>
        } */}

      </SafeAreaView>
    </View>
  );
}
