import AppNavigationType from "./AppNavigationType";
import MainScreen from "../screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import { useAuth } from "../providers/AuthProvider";
import { useTheme } from "../../tmd/providers/ThemeProvider";
import SplashScreen from "../screens/SplashScreen";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<AppNavigationType>();
  const { theme } = useTheme();
  const NavTheme = {
    ...theme,
    colors: {
      ...theme?.colors,
      background: theme?.colors.neutral.neutral_10,
    },
  };
  return (
    <NavigationContainer ref={navigationRef} theme={NavTheme}
      >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoadingSplash ? (
          <>
            <Stack.Screen name={"SplashScreen"} component={SplashScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={"MainScreen"} component={MainScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
