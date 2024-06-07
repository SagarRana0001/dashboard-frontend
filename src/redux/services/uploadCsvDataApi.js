import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const uploadCsvDataApi = createApi({
  reducerPath: "uploadCsvDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getUploadCsvDataApiByName: builders.mutation({
      query: ({ body, token }) => ({
        url: `upload-data`,
        method: "POST",
        body: body,
        headers: {
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
export const { useGetUploadCsvDataApiByNameMutation } = uploadCsvDataApi;
export default uploadCsvDataApi;
