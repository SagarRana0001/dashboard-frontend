import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const uploadImgApi = createApi({
  reducerPath: "uploadImgApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getUploadImgApiByName: builders.mutation({
      query: ({ body, token, id }) => ({
        url: "upload",
        method: "PUT",
        body: body,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});
export const { useGetUploadImgApiByNameMutation } = uploadImgApi;
export default uploadImgApi;
