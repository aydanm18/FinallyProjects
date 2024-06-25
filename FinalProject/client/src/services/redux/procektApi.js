import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const procektApi = createApi({
  reducerPath: 'procektApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    getPizzas: builder.query({
      query: () => `pizzas`,
    }),
    getMenus: builder.query({
      query: () => `menues`,
    }),
    getByIdOnePizza: builder.query({
      query: (id) => `pizzas/${id}`,
    }),
    getByIdOneMenu: builder.query({
      query: (id) => `menues/${id}`,
    }),
    deleteByIdPizza: builder.mutation({
      query: (id) => ({
        url: `pizzas/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteByIdMenu: builder.mutation({
      query: (id) => ({
        url: `menues/${id}`,
        method: 'DELETE',
      }),
    }),
    postByPizza: builder.mutation({
      query: (payload) => ({
        url: `pizzas`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    postByMenu: builder.mutation({
      query: (payload) => ({
        url: `menues`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    patchByPizza: builder.mutation({
      query: ({ id, payload }) => ({
        url: `pizzas/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
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
  useGetPizzasQuery,
  useGetMenusQuery,
  useGetByIdOnePizzaQuery,
  useGetByIdOneMenuQuery,
  useDeleteByIdMenuMutation,
  useDeleteByIdPizzaMutation,
  usePostByMenuMutation,
  usePostByPizzaMutation,
  usePatchByPizzaMutation,
  usePatchByMenuMutation,
} = procektApi;
