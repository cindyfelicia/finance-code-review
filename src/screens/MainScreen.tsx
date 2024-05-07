/**
 * Created by Nathania Lawrence Widjaja
 * Copyright (c) 2023
 */

import { BackHandler, TouchableOpacity, View } from 'react-native';
import { Icon, Toast, appTheme } from '../../tmd';
import React, { useEffect, useState } from 'react';

import AppNavigationType from '../navigations/AppNavigationType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Typography from '../../tmd/components/Typography/Typography';
import { _componentGalleries } from '../data/_componentGalleries';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { isIos } from '../utils/platform';
import { useIsFocused } from '@react-navigation/native';
import { useLocale } from '../providers/LocaleProvider';
import HomeScreen from './HomeScreen';
import CategoryScreen from './category/CategoryScreen';
import TransactionScreen from './transaction/TransactionScreen';
import BudgetScreen from './budget/BudgetScreen';

const MainScreen = ({ route }: NativeStackScreenProps<AppNavigationType, 'MainScreen'>) => {
  const Tab = createBottomTabNavigator();
  const { t } = useLocale();

  const [isEnableBack, setEnableBack] = useState(false);
  const isFocused = useIsFocused();
  const { colors } = appTheme();

  const backAction = () => {
    if (isEnableBack) {
      BackHandler.exitApp();
    } else {
      Toast.show(t('backConfirmation'), { colorVariant: 'info' });
      setEnableBack(true);
      setTimeout(() => {
        setEnableBack(false);
      }, 3000);
    }
    return true;
  };

  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }
  }, [isEnableBack, isFocused]);

  function UserBottomTabBar({ state, descriptors, navigation }: any) {
    const getTabIcon = (name: string, isFocused: boolean) => {
      const usedColor = isFocused ? colors.primary.main : colors.neutral.neutral_60;

      return (
        <>
          {name == 'HomeScreen' && (
            <>{<Icon icon={isFocused ? 'ios-home' : 'ios-home-outline'} color={usedColor} size={20} />}</>
          )}
          {name == 'CategoryScreen' && (
            <>
              {<Icon icon={isFocused ? 'grid' : 'grid-outline'} color={usedColor} size={20} />}
            </>
          )}
          {name == 'TransactionScreen' && (
            <>
              {
                <Icon
                  icon={isFocused ? 'git-compare' : 'git-compare-outline'}
                  color={usedColor}
                  size={20}
                />
              }
            </>
          )}
          {name == 'BudgetScreen' && (
            <>
              {
                <Icon
                  icon={isFocused ? 'wallet' : 'wallet-outline'}
                  color={usedColor}
                  size={20}
                />
              }
            </>
          )}
        </>
      );
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderColor: colors.neutral.neutral_30,
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
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              // navigation.navigate({name: route.name, merge: true});
              navigation.navigate({ name: route.name });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center' }}>
              {getTabIcon(route.name, isFocused)}
              <Typography
                type={'label2'}
                style={{
                  color: isFocused ? colors.primary.main : colors.neutral.neutral_60,
                  marginTop: 4,
                }}>
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: isIos ? 8 : 0 }}>
      <Tab.Navigator
        tabBar={(props) => <UserBottomTabBar {...props} />}
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: t('common.home'),
          }}
        />
        <Tab.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{
            tabBarLabel: t('common.category'),
          }}
        />
        <Tab.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{
            tabBarLabel: t('common.transaction'),
          }}
        />
        <Tab.Screen
          name="BudgetScreen"
          component={BudgetScreen}
          options={{
            tabBarLabel: t('common.budget'),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainScreen;
