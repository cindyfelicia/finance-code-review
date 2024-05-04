/**
 * Created by Widiana Putra on 20/12/2022
 * Copyright (c) 2022 - Made with love
 */
import Config from "react-native-config";
import StorageKey from "../utils/StorageKey";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchClient from "../utils/network/fetchClient";

export default function useFetchBaseService() {
  const getUrl = (route: string) => {
    return `${Config.BASE_URL}${route}`;
  };

  const getHeaders = async () => {
    const token = await AsyncStorage.getItem(StorageKey.ACCESS_TOKEN);
    const locale = await AsyncStorage.getItem(StorageKey.LOCALE);
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-App-Locale": locale ?? "en",
      Authorization: token ? `Bearer ${token}` : undefined,
    };
  };
  const getAPI = async <E>(route: string, body?: any) => {
    try {
      const response = await fetchClient(getUrl(route), {
        method: "GET",
        headers: await getHeaders(),
        body: body ? JSON.stringify(body, null, 2) : undefined,
      });
      return response as E;
    } catch (e) {
      throw e;
    }
  };

  const postAPI = async <E>(route: string, body?: any) => {
    try {
      const response = await fetchClient(getUrl(route), {
        method: "POST",
        headers: await getHeaders(),
        body: body ? JSON.stringify(body, null, 2) : undefined,
      });
      return response as E;
    } catch (e) {
      throw e;
    }
  };


  const patchAPI = async <E>(route: string, body?: any) => {
    try {
      const response = await fetchClient(getUrl(route), {
        method: "PATCH",
        headers: await getHeaders(),
        body: body ? JSON.stringify(body, null, 2) : undefined,
      });
      return response as E;
    } catch (e) {
      throw e;
    }
  };


  const putAPI = async <E>(route: string, body?: any) => {
    try {
      const response = await fetchClient(getUrl(route), {
        method: "PUT",
        headers: await getHeaders(),
        body: body ? JSON.stringify(body, null, 2) : undefined,
      });
      return response as E;
    } catch (e) {
      throw e;
    }
  };

  const deleteAPI = async <E>(route: string, body?: any) => {
    try {
      const response = await fetchClient(getUrl(route), {
        method: "DELETE",
        headers: await getHeaders(),
        body: body ? JSON.stringify(body, null, 2) : undefined,
      });
      return await response as E;
    } catch (e) {
      throw e;
    }
  };

  return {
    getAPI,
    postAPI,
    patchAPI,
    deleteAPI,
    putAPI,
  };
}
