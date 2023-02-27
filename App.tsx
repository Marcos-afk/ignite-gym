import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, Box } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from '@theme/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <Box>Hello World!</Box> : <Loading />}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </NativeBaseProvider>
  );
}
