import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `https...`;

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Categories'],
	endpoints: (build) => ({}),
	baseQuery: fetchBaseQuery({ baseUrl }),
});
