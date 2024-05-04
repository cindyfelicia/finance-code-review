// /**
//  * Created by Widiana Putra on 22/06/2022
//  * Copyright (c) 2022 - Made with love
//  */

import { Keyboard, Platform } from 'react-native';
import {
  NotificationOption,
  RESULTS,
  checkMultiple,
  checkNotifications,
  requestMultiple,
  requestNotifications,
} from 'react-native-permissions';
import React, { createContext, useContext } from 'react';
import _permissionTypes, { LOCATION_PERMISSIONS, PermissionOS } from '../data/_permissionTypes';

import { Permission } from 'react-native-permissions/src/types';
import { useBottomSheet } from './BottomSheetProvider';
import { useModal } from './ModalProvider';

type PermissionContextType = {
  requestPermissions: (
    permissions: PermissionOS[],
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => void;
  requestBluetoothPermission: (onGranted: () => void, onReject?: () => void) => void;
  requestStoragePermission: (
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => void;
  requestLocationPermission: (
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => void;
  requestNotificationPermission: (
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => void;
  // isLocationPermissionBlocked: () => Promise<boolean>;
  isLocationPermissionGranted: () => Promise<boolean>;
  isLocationPermissionDenied: () => Promise<boolean>;
};

const initialState: PermissionContextType = {
  requestPermissions: (
    permissions: PermissionOS[],
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => {},
  requestBluetoothPermission: (onGranted: () => void, onReject?: () => void) => {},
  requestStoragePermission: (onGranted: () => void, onReject?: () => void) => {},
  requestLocationPermission: (onGranted: () => void, onReject?: () => void) => {},
  requestNotificationPermission: (
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => {},
  isLocationPermissionGranted: async (): Promise<boolean> => {
    return false;
  },
  isLocationPermissionDenied: async (): Promise<boolean> => {
    return false;
  },
};

export const PermissionContext = createContext(initialState);
export const usePermission = () => useContext(PermissionContext);

const PermissionProvider = ({ children }: any) => {
  const { showPermissionBS } = useBottomSheet();
  const { showConfirmationModal, hideConfirmationModal } = useModal();

  const requestPermissions = async (
    permissions: PermissionOS[],
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => {
    const isAndroid = Platform.OS == 'android';
    let osPermissions: Permission[];
    if (isAndroid) {
      osPermissions = permissions.map((it) => it.android).flat();
    } else {
      osPermissions = permissions.map((it) => it.ios).flat();
    }
    let isIosBlocked: boolean = true;
    if (Platform.OS == 'ios') {
      isIosBlocked = await checkBlockediOSPermission(permissions);
    }
    if (Platform.OS == 'ios' && isIosBlocked) {
      if (onBlocked) onBlocked();
    } else {
      requestMultiple(osPermissions).then((statuses) => {
        const grantedResults = osPermissions.map((it) => statuses[it] == 'granted');
        const deniedResults = osPermissions.map((it) => statuses[it] == 'denied');
        const blockedResults = osPermissions.map((it) => statuses[it] == 'blocked');
        console.log('====================================');
        console.log('Blocked: ', osPermissions);
        console.log('====================================');
        console.log('Masuk request');
        console.log('Granted: ', JSON.stringify(grantedResults, null, 2));
        console.log('Denied: ', JSON.stringify(deniedResults, null, 2));
        console.log('Blocked: ', JSON.stringify(blockedResults, null, 2));
        console.log('Permission: ', JSON.stringify(osPermissions, null, 2));
        console.log('====================================');
        if (!grantedResults.includes(false)) {
          onGranted();
        } else {
          if (blockedResults.includes(true)) {
            if (onBlocked) onBlocked();
          } else {
            if (onReject) onReject();
          }
        }
        Keyboard.dismiss();
      });
    }
  };

  const checkPermissions = async (permissions: PermissionOS[]) => {
    const isAndroid = Platform.OS == 'android';
    let osPermissions: Permission[];
    if (isAndroid) {
      osPermissions = permissions.map((it) => it.android).flat();
    } else {
      osPermissions = permissions.map((it) => it.ios).flat();
    }
    const res = await checkMultiple(osPermissions);
    return Object.keys(res).every((it) => res[it] == 'granted');
  };

  const checkDeniedPermission = async (permissions: PermissionOS[]) => {
    let osPermissions: Permission[];
    if (Platform.OS == 'android') {
      osPermissions = permissions.map((it) => it.android).flat();
    } else {
      osPermissions = permissions.map((it) => it.ios).flat();
    }
    try {
      // Check if any of the permissions are currently blocked
      // Check the permission status
      const statuses = await checkMultiple(osPermissions);
      return Object.values(statuses).includes(RESULTS.DENIED);
    } catch (error) {
      return false;
    }
  };

  const checkGrantedPermission = async (permissions: PermissionOS[]) => {
    let osPermissions: Permission[];
    if (Platform.OS == 'android') {
      osPermissions = permissions.map((it) => it.android).flat();
    } else {
      osPermissions = permissions.map((it) => it.ios).flat();
    }
    try {
      // Check if any of the permissions are currently blocked
      // Check the permission status
      const statuses = await checkMultiple(osPermissions);
      return Object.values(statuses).includes(RESULTS.GRANTED);
    } catch (error) {
      console.log('Error checking iOS permissions:', error);
      return false;
    }
  };

  const checkBlockediOSPermission = async (permissions: PermissionOS[]) => {
    let osPermissions: Permission[];
    osPermissions = permissions.map((it) => it.ios).flat();
    try {
      const statuses = await checkMultiple(osPermissions);
      console.log('checkBlockediOSPermission: ', JSON.stringify(statuses, null, 2));
      return Object.values(statuses).includes(RESULTS.BLOCKED);
    } catch (error) {
      console.log('Error checking iOS permissions:', error);
      return false;
    }
  };

  const isLocationPermissionGranted = async (): Promise<boolean> => {
    const req: PermissionOS[] = [LOCATION_PERMISSIONS];
    const isGranted = await checkGrantedPermission(req);
    return isGranted;
  };

  const isLocationPermissionDenied = async (): Promise<boolean> => {
    const req: PermissionOS[] = [LOCATION_PERMISSIONS];
    const isDenied = await checkDeniedPermission(req);
    return isDenied;
  };

  const requestLocationPermission = async (
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => {
    const req: PermissionOS[] = [LOCATION_PERMISSIONS];
    const allGranted = await checkPermissions(req);
    let isBlockedIos: boolean = true;
    if (Platform.OS == 'ios') {
      isBlockedIos = await checkBlockediOSPermission(req);
    }

    if (allGranted || (Platform.OS == 'ios' && isBlockedIos)) {
      // If granted/blocked, don't have to show confirmation modal
      requestPermissions(req, onGranted, onReject, onBlocked);
    } else {
      showConfirmationModal({
        dismissible: false,
        title: 'Location Access',
        description: `Granting access to your current location important to show you nearby services. Your location data is only used within the app. Location updates only during opening the app and not in the background.`,
        buttonSecondary: false,
        buttonPrimaryTitle: 'Continue',
        buttonOrientation: 'vertical',
        buttonPrimaryAction: () => {
          hideConfirmationModal();
          requestPermissions(req, onGranted, onReject, onBlocked);
        },
      });
    }
  };

  const requestNotificationPermission = async (
    onGranted: () => void,
    onReject?: () => void,
    onBlocked?: () => void
  ) => {
    const options: NotificationOption[] = ['alert', 'badge', 'sound'];
    const { status } = await checkNotifications();

    if (status === 'denied') {
      const res = await requestNotifications(options);
      console.log('====================================');
      console.log('Res: ', res);
      console.log('====================================');

      if (res.status === 'granted') {
        if (onGranted) onGranted();
      } else if (res.status === 'blocked') {
        if (onBlocked) onBlocked();
      } else if (status === 'denied') {
        if (onReject) onReject();
      }
      else {
        showConfirmationModal({
          dismissible: false,
          title: 'Glow Diaries would like to send you notifications',
          description: `Notifications may include alerts, sounds, and icon badges. These can be configured in your device settings.`,
          buttonPrimaryTitle: 'Allow',
          buttonOrientation: 'vertical',
          buttonPrimaryAction: async () => {
            const res = await requestNotifications(options);
            if (res.status === 'granted') {
              if (onGranted) onGranted();
            } else if (res.status === 'blocked') {
              if (onBlocked) onBlocked();
            } else {
              if (onReject) onReject();
            }
          },
          buttonSecondary: true,
          buttonSecondaryTitle: `Don't Allow`,
          buttonSecondaryAction() {
            if (onReject) onReject();
          },
        });
      }
    }
  };

  return (
    <PermissionContext.Provider
      value={{
        requestPermissions,
        requestLocationPermission,
        isLocationPermissionGranted,
        isLocationPermissionDenied,
        requestNotificationPermission,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
