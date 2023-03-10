import axios from 'axios';
import { API_URL } from '@env';
import { AppError } from '@utils/Errors';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message as string));
    } else {
      return Promise.reject(error);
    }
  },
);

export { api };
