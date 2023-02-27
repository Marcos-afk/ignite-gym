import { IButtonProps } from 'native-base';

export interface ButtonProps extends IButtonProps {
  title: string;
  variant?: 'solid' | 'outline';
}
