import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const allDataApi = createApi({
  reducerPath: "allDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getAllDataApiByName: builders.query({
      query: () => ({
        url: "alldata",
        method: "GET",
      }),
    }),
  }),
});
export const { useLazyGetAllDataApiByNameQuery } = allDataApi;
export default allDataApi;
