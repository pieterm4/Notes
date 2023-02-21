import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiURL } from "../Utils/Constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiURL(),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token !== "" && token !== null) {
        const authorizationHeaderName = "authorization";
        const bearerToken = "Bearer " + token;
        headers.set(authorizationHeaderName, bearerToken);
      }
      return headers;
    },
  }),
  endpoints: (_builder) => ({}),
});
