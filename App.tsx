import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from '@theme/index';
import { Routes } from '@routes/index';
import { AuthProvider } from '@contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </NativeBaseProvider>
  );
}
