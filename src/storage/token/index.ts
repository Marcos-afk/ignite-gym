import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_TOKEN } from '../config';

export const storageAuthTokenSave = async (token: string) => {
  try {
    await AsyncStorage.setItem(USER_TOKEN, token);
  } catch (error) {
    throw error;
  }
};

export const storageAuthTokenGet = async () => {
  try {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    return token as string;
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
