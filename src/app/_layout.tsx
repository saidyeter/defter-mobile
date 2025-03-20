import '@/global.css';
import { NAV_THEME } from '@/lib/constants';
import { MoonStar } from "@/lib/icons/moonstar";
import { Sun } from "@/lib/icons/sun";
import { useColorScheme } from '@/lib/useColorScheme';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Link, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from "react";
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
  return (
    <View style={{ paddingTop: top }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
        <Link
          suppressHighlighting
          className="flex h-9 items-center justify-center overflow-hidden rounded-md p-2 text-3xl font-medium dark:text-gray-50 web:shadow ios:shadow transition-colors   focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  text-gray-900  dark:focus-visible:ring-gray-300"
          href="/"
        >
          Defter
        </Link>
        <View className="flex flex-row gap-4 sm:gap-6  items-center">

          <Pressable
            className="text-md font-medium hover:underline web:underline-offset-4"
            onPress={toggleColorScheme}
          >
            {isDarkColorScheme ?
              <Sun color={isDarkColorScheme ? "white" : "black"} size={16} /> :
              <MoonStar color={isDarkColorScheme ? "white" : "black"} size={16} />
            }
          </Pressable>
        </View>
      </View>
    </View>
  );
}