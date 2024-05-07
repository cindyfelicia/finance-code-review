import AppNavigationType from "./AppNavigationType";
import MainScreen from "../screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import { useTheme } from "../../tmd/providers/ThemeProvider";
import SplashScreen from "../screens/SplashScreen";
import { rootReducer } from "../redux/stores/store";
import { useSelector } from "react-redux";
import TransactionEditScreen from "../screens/transaction/TransactionEditScreen";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<AppNavigationType>();
  const { isLoading: isLoadingSplash } = useSelector((state: ReturnType<typeof rootReducer>) => state.splashReducer);
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
            <Stack.Screen name={"TransactionEditScreen"} component={TransactionEditScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
