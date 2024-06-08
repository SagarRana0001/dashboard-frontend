import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builders) => ({
    getSignUpApiByName: builders.mutation({
      query: ({ body }) => ({
        url: "register",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetSignUpApiByNameMutation } = signUpApi;
export default signUpApi;
