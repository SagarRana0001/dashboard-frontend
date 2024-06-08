import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getLoginByName: builders.mutation({
      query: ({ body }) => ({
        url: "login",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetLoginByNameMutation } = loginApi;
export default loginApi;
