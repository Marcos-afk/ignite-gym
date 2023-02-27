import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from '@theme/index';
//import { SignIn } from '@screens/Sign-in';
import { SignUp } from '@screens/Sign-up';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <SignUp /> : <Loading />}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </NativeBaseProvider>
  );
}
