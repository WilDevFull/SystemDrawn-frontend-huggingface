import {
  Stack,
} from 'expo-router';

import * as SplashScreen
from 'expo-splash-screen';

import {
  useEffect,
  useState,
} from 'react';

import {
  View,
} from 'react-native';

import {
  useSettingsStore,
} from '@/store/settingsStore';

SplashScreen.preventAutoHideAsync();

export default function
RootLayout() {

  const [
    appReady,
    setAppReady,
  ] = useState(false);

  const {
    loadSettings,
    darkMode,
  } =
    useSettingsStore();

  useEffect(() => {

    async function
    prepare() {

      try {

        /**
         * Carrega configs
         */
        await loadSettings();

        /**
         * Splash fake
         */
        await new Promise(
          (
            resolve
          ) =>
            setTimeout(
              resolve,
              2500
            )
        );

      } catch (
        e
      ) {

        console.log(
          e
        );

      } finally {

        setAppReady(
          true
        );

        await SplashScreen.hideAsync();
      }
    }

    prepare();

  }, []);

  if (!appReady) {
    return null;
  }

  return (

    <View
      style={{
        flex: 1,

        backgroundColor:
          darkMode
            ? '#0A0A0A'
            : '#F5F5F5',
      }}
    >

      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0A0A0A',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            color: '#FFF',
            fontWeight: '700',
          },
          headerBackTitleVisible: true,
          headerBackVisible: true,
        }}
      />

    </View>
  );
}
