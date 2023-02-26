import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

interface User {
	first_name: string;
	last_name: string;
}

interface UserResponse {
	user: User;
	token: string;
}

interface LoginRequest {
	email: string;
	password: string;
}

// const baseUrl = `http://192.168.149.153:3333`;
const baseUrl = `http://192.168.0.13:3333`;

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Categories'],
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).auth?.token;
			console.log(token?.token, 'token.token');
			if (token) {
				headers.set('Authorization', `Bearer ${token?.token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		signIn: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: 'auth',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['Categories'],
		}),
		signOut: builder.mutation({
			query: () => ({
				url: 'auth',
				method: 'DELETE',
			}),
			invalidatesTags: ['Categories'],
		}),
	}),
});

export const { useSignInMutation, useSignOutMutation } = apiSlice;
