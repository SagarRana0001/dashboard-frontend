import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const updateApi = createApi({
  reducerPath: "updateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getUpdateApiByName: builders.mutation({
      query: ({ body, token, id }) => ({
        url: `update?id=${id}`,
        method: "PUT",
        body: body,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});
export const { useGetUpdateApiByNameMutation } = updateApi;
export default updateApi;
