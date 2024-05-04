import { Linking, View } from 'react-native';
import { Page, Stack, appTheme } from '../../tmd';
import React, { useEffect } from 'react';

import SplashLogo from '../assets/images/splash_logo.svg';
import Typography from '../../tmd/components/Typography/Typography';
import { getVersion } from 'react-native-device-info';
import { useLocale } from '../providers/LocaleProvider';
import { dispatch } from '../redux/stores/store';

export default function SplashScreen() {
  const version = getVersion();
  const { colors } = appTheme();
  const { t } = useLocale();

  const dispatchDoneLoadingSplash = () => {
    dispatch({
      type: "DONE_LOADING_SPLASH",
    });
  };

  useEffect(() => {
    dispatchDoneLoadingSplash();
  }, [])

  return (
    <Page>
      <Stack
        style={{ flex: 1 }}
        items={'center'}
        content={'center'}
        spacing={16}
      >
      </Stack>
    </Page>
  );
}
