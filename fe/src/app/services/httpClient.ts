import axios, { AxiosError } from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";
import { ApiError } from "../errors/api-error";
import { ErrorResponse } from "../errors/error-response.interface";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(async (config) => {
  const jwtAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (jwtAccessToken) {
    config.headers.Authorization = `Bearer ${jwtAccessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    await sleep(500);

    if (error.response?.data) {
      const errorResponse = error.response.data;
      throw new ApiError(errorResponse);
    }

    throw error;
  }
);
