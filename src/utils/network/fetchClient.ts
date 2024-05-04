/**
 * Created by Widiana Putra on 21/12/2022
 * Copyright (c) 2022 - Made with love
 */
import RNFetchBlob from "rn-fetch-blob";

const fetchClient = (resource: RequestInfo, config: RequestInit) => {
  //intercept request
  const printable = `--Request--\nMethod: ${config?.method?.toUpperCase()} \nURL: ${
    resource}\nHeaders:${JSON.stringify(config?.headers, null, 2)} \nData: ${config.body}`;
  console.log(printable);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await RNFetchBlob
        .config({ trusty: true })
        .fetch(config?.method ?? "GET", resource, config?.headers, config?.body);

      const resJson = JSON.parse(response.data);
      const printableResResponse = JSON.stringify(resJson, null, 2);
      if (response.respInfo.status < 300) {
        const printableRes = `--Response--\nStatus: ${response.respInfo.status} \nResponse: ${printableResResponse}`;
        console.log(printableRes);
        resolve(resJson);
      } else {
        const printableRes = `--Response--\nStatus: ${response.respInfo.status} \nResponse: ${printableResResponse}`;
        console.log(printableRes);
        reject(resJson);
      }
    } catch (e) {
      reject(e);
    }
  });
};


export default fetchClient;
