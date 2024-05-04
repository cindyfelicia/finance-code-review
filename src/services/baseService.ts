import client from "../utils/network/client";

/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */

export const postAPI = async <E>(route: string, body?: any, headers?: any) => {
  try {
    const res = await client.post(route, body, headers);
    return res.data as E;
  } catch (e) {
    throw e;
  }
};
export const patchAPI = async (route: string, body?: any, headers?: any) => {
  try {
    const res = await client.patch(route, body, headers);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const deleteAPI = async (route: string, body?: any) => {
  try {
    const res = await client.delete(route, body);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const getAPI = async <E>(route: string, body?: any) => {
  try {
    return (await client.get(route, body)) as E;
  } catch (e) {
    throw e;
  }
};
