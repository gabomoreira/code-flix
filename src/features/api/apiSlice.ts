import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignInRequest, SignInResponse } from '../../@types/Auth';
import { RootState } from '../../app/store';


// const baseUrl = `http://192.168.149.153:3333`;
const baseUrl = `http://localhost:3333`;
// const baseUrl = `http://192.168.0.13:3333`;

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Categories', 'CastMembers'],
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).auth?.token;
			if (token) {
				headers.set('Authorization', `Bearer ${token?.token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({

	}),
});