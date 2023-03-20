import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type AppRoutesProps = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: {
    id: number;
  };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>;
