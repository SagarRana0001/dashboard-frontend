import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const deleteApi = createApi({
  reducerPath: "deleteApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getDeleteApiByName: builders.mutation({
      query: ({ body, token, id }) => ({
        url: `update?id=${id}`,
        method: "PUT",
        body: body,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});
export const { useGetDeleteApiByNameMutation } = deleteApi;
export default deleteApi;
