import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '@screens/Sign-in';
import { SignUp } from '@screens/Sign-up';
import { AuthRoutesProps } from './AuthRoutesProps';

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>();

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
};
