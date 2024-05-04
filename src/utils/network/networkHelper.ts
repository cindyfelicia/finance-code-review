/**
 * Created by Widiana Putra on 21/12/2022
 * Copyright (c) 2022 - Made with love
 */

export const isNetworkError = (error: any) => {
  return error?.message === "Network Error" || error?.message === "Network request failed";
};
