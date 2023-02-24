import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#202024' }}>
      {fontsLoaded ? <Text style={{ fontFamily: 'Roboto_700Bold' }}>Hello World!</Text> : <View />}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </View>
  );
}
