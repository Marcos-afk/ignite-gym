import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_TOKEN } from '../config';

interface StorageAuthTokenProps {
  token: string;
  refresh_token: string;
}

export const storageAuthTokenSave = async ({ token, refresh_token }: StorageAuthTokenProps) => {
  try {
    await AsyncStorage.setItem(USER_TOKEN, JSON.stringify({ token, refresh_token }));
  } catch (error) {
    throw error;
  }
};

export const storageAuthTokenGet = async () => {
  try {
    const response = await AsyncStorage.getItem(USER_TOKEN);

    const { token, refresh_token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};
    return { token, refresh_token };
  } catch (error) {
    throw error;
  }
};

export const storageAuthTokenRemove = async () => {
  try {
    await AsyncStorage.removeItem(USER_TOKEN);
  } catch (error) {
    throw error;
  }
};
