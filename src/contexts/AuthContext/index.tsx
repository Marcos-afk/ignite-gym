import { UserDTO } from '@dtos/user';
import { api } from '@services/api';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/token';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/user';
import { createContext, useEffect, useState } from 'react';
import { AuthContextProps, AuthProviderProps } from './AuthContextProps';

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const userAndTokenUpdate = (user: UserDTO, token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  const storageUserAndTokenSave = async (user: UserDTO, token: string, refresh_token: string) => {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(user);
      await storageAuthTokenSave({ token, refresh_token });
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const storageUserAndTokenGet = async () => {
    try {
      setIsLoadingUserStorageData(true);
      const user = await storageUserGet();
      const { token, refresh_token } = await storageAuthTokenGet();

      return { user, token, refresh_token };
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const storageUserAndTokenRemove = async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageAuthTokenRemove();
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });

      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await storageUserAndTokenRemove();
    } catch (error) {
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      const { user, token } = await storageUserAndTokenGet();

      if (token && user) {
        userAndTokenUpdate(user, token);
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (user: UserDTO) => {
    try {
      setUser(user);
      await storageUserSave(user);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscriber = api.registerInterceptTokenManager(signOut);
    return () => subscriber();
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
