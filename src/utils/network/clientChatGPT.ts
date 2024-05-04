/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../StorageKey";
import Config from "react-native-config";

const getLocale = async () => {
  try {
    const locale = await AsyncStorage.getItem(StorageKey.LOCALE);
    return locale ?? "en";
  } catch (e) {
    return "en";
  }
};

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem(StorageKey.ACCESS_TOKEN);
    return token ?? "";
  } catch (e) {
    return "";
  }
};

const clientChatGPT = axios.create({
  baseURL: "https://api.openai.com/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-App-Locale": "en",
    "Authorization": "Bearer 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"
  },
});

clientChatGPT.interceptors.request.use(
  async (config) => {
    // config.headers.common = { ...config.headers.common, "X-App-Locale": await getLocale() };
    const printable = `--Request--\nMethod: ${config?.method?.toUpperCase()} \nURL: ${
      config.baseURL
    }${config.url}\nHeaders:${JSON.stringify(config?.headers, null, 2)} \nParams: ${JSON.stringify(
      config.params,
      null,
      2,
    )} \nData: ${JSON.stringify(config.data, null, 2)}`;
    console.log(printable);
    return config;
  },
  (error) => Promise.reject(error),
);

clientChatGPT.interceptors.response.use(
  (response) => {
    const printable = `--Response--\nStatus: ${response.status} \nResponse: ${JSON.stringify(
      response.data,
      null,
      2,
    )}`;
    console.log(printable);
    return response.data;
  },
  (error) => {
    const err = error.response?.data ?? error;
    console.log(JSON.stringify(err, null, 2));
    return Promise.reject(err);
  },
);

export default clientChatGPT;


