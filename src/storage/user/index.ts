import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDTO } from '@dtos/user';
import { USER_STORAGE } from '../config';

export const storageUserSave = async (user: UserDTO) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
};

export const storageUserGet = async () => {
  try {
    const storage = await AsyncStorage.getItem(USER_STORAGE);
    const user: UserDTO = storage ? JSON.parse(storage) : {};
    return user;
  } catch (error) {
    throw error;
  }
};

export const storageUserRemove = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    throw error;
  }
};
