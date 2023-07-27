import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";

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

httpClient.interceptors.response.use(async (config) => {
  await sleep(500)

  return config;
});
