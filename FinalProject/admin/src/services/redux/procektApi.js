import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const procektApi = createApi({
  reducerPath: 'procektApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://finallyprojects.fly.dev/' }),
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers;
  },
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => `menues`,
    }),
    getByIdOneMenu: builder.query({
      query: (id) => `menues/${id}`,
    }),
    deleteByIdMenu: builder.mutation({
      query: (id) => (
        {
          url: `menues/${id}`,
          method: 'DELETE'
        }
      ),
    }),
    postByMenu: builder.mutation({

      query: (payload) => ({
        url: `menues`,
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }),

    }),
    patchByMenu: builder.mutation({
      query: ({ id, payload }) => ({
        url: `menues/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetByIdOneMenuQuery,
  useDeleteByIdMenuMutation,
  usePostByMenuMutation,
  usePatchByMenuMutation,
} = procektApi;
