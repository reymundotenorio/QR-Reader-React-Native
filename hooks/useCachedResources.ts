import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          // eslint-disable-next-line global-require
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          // eslint-disable-next-line global-require
          'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
          // eslint-disable-next-line global-require
          'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
