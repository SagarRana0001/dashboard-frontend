import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const permanentDeleteApi = createApi({
  reducerPath: "deleteApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getpermanentDeleteApiByName: builders.mutation({
      query: ({ body, token, id }) => ({
        url: `delete?id=${id}`,
        method: "DELETE",
        body: body,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});
export const { useGetpermanentDeleteApiByNameMutation } = permanentDeleteApi;
export default permanentDeleteApi;
