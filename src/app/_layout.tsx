import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import '@/global.css';
import { NAV_THEME } from '@/lib/constants';
import { ChevronLeft, MoonStar, Sun } from "@/lib/icons";
import { useColorScheme } from '@/lib/useColorScheme';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack, useNavigation } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import React, { useEffect } from "react";
import { Platform, Pressable, View } from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack screenOptions={{
        header: () => <Header />,
      }} />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;



function Header() {
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme()
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const cgb = navigation.canGoBack()
  return (
    <View style={{ paddingTop: top, marginBottom: 16 }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
        <Button
          disabled={!cgb} variant='outline' className='items-center justify-center'
          onPress={() => {
            if (!cgb) return;
            navigation.goBack()
          }}>
          <ChevronLeft size={16} className={cgb ? 'text-primary' : 'text-gray-500'} />
        </Button>

        <Text className='text-3xl font-bold' >Defter</Text>
        <View className="flex flex-row gap-4 sm:gap-6  items-center">
          <Pressable
            className="text-md font-medium hover:underline web:underline-offset-4"
            onPress={toggleColorScheme}
          >
            {isDarkColorScheme ?
              <MoonStar color={isDarkColorScheme ? "white" : "black"} size={24} /> :
              <Sun color={isDarkColorScheme ? "white" : "black"} size={24} />
            }
          </Pressable>
        </View>
      </View>
    </View>
  );
}

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
      console.log(`Expo update loaded`, '');
    }
  } catch (error) {
    console.log(`Error fetching latest Expo update`, JSON.stringify(error));
  }
}