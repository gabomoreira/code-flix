import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = `http://192.168.149.153:3333`;
const baseUrl = `http://192.168.0.13:3333`;

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Categories'],
	endpoints: (build) => ({}),
	baseQuery: fetchBaseQuery({ baseUrl }),
});
