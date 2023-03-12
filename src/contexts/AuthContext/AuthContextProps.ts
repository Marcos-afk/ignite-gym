import { UserDTO } from '@dtos/user';
import { ReactNode } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}
