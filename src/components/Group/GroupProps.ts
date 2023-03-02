import { IPressableProps } from 'native-base';

export interface GroupProps extends IPressableProps {
  name: string;
  isActive: boolean;
}
