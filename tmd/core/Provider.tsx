import * as React from "react";
import { AccessibilityInfo, Appearance, ColorSchemeName, NativeEventSubscription } from "react-native";
import { ThemeProvider } from "./theming";
import { Provider as SettingsProvider, Settings } from "./settings";
import MaterialCommunityIcon from "../components/MaterialCommunityIcon";
import PortalHost from "../components/Portal/PortalHost";
import DefaultTheme from "../styles/theme/DefaultTheme";
import { addEventListener } from "../utils/addEventListener";
import { Theme } from "../types/types";
import DarkTheme from "../styles/theme/DarkTheme";

type Props = {
  children: React.ReactNode;
  theme?: Theme;
  settings?: Settings;
};

const Provider = ({ ...props }: Props) => {
  const colorSchemeName =
    (!props.theme && Appearance?.getColorScheme()) || "light";

  const [reduceMotionEnabled, setReduceMotionEnabled] =
    React.useState<boolean>(false);
  const [colorScheme, setColorScheme] =
    React.useState<ColorSchemeName>(colorSchemeName);

  const handleAppearanceChange = (
    preferences: Appearance.AppearancePreferences,
  ) => {
    const { colorScheme } = preferences;
    setColorScheme(colorScheme);
  };

  React.useEffect(() => {
    let subscription: NativeEventSubscription | undefined;

    if (!props.theme) {
      subscription = addEventListener(
        AccessibilityInfo,
        "reduceMotionChanged",
        setReduceMotionEnabled,
      );
    }
    return () => {
      if (!props.theme) {
        subscription?.remove();
      }
    };
  }, [props.theme]);

  React.useEffect(() => {
    let appearanceSubscription: NativeEventSubscription | undefined;
    if (!props.theme) {
      appearanceSubscription = Appearance?.addChangeListener(
        handleAppearanceChange,
      ) as NativeEventSubscription | undefined;
    }
    return () => {
      if (!props.theme) {
        if (appearanceSubscription) {
          appearanceSubscription.remove();
        } else {
          Appearance?.removeChangeListener(handleAppearanceChange);
        }
      }
    };
  }, [props.theme]);

  const getTheme = () => {
    const { theme: providedTheme } = props;

    if (providedTheme) {
      return providedTheme;
    } else {
      const theme = (
        DefaultTheme
      ) as Theme;

      return {
        ...theme,
        animation: {
          ...theme.animation,
          scale: reduceMotionEnabled ? 0 : 1,
        },
      };
    }
  };

  const { children, settings } = props;
  return (
    <PortalHost>
      <SettingsProvider value={settings || { icon: MaterialCommunityIcon }}>
        <ThemeProvider theme={DarkTheme}>{children}</ThemeProvider>
      </SettingsProvider>
    </PortalHost>
  );
};

export default Provider;
