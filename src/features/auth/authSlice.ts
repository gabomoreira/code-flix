import { createSlice } from '@reduxjs/toolkit';
import { RegisterRequest, SignInRequest, SignInResponse, Token, User } from '../../@types/Auth';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';


type InitiaState = {
	user: User | null,
	token: Token | null
};

const initialState: InitiaState = {
	user: null,
	token: null
}

const endpoint = `/auth`

function signInMutation(credentials: SignInRequest) {
	return {
		url: `${endpoint}`,
		method: 'POST',
		body: credentials
	}
}

function signOutMutation() {
	return {
		url: `${endpoint}`,
		method: 'DELETE',
	}
}

function registerUserMutation(credentials: RegisterRequest) {
	return {
		url: `/user`,
		method: 'POST',
		body: credentials
	}
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: ({query, mutation}) => ({
		signIn: mutation<SignInResponse, SignInRequest>({
			query: signInMutation
		}),
		signOut: mutation<void, void>({
			query: signOutMutation
		}),
		registerUser: mutation<User, RegisterRequest>({
			query: registerUserMutation
		}),
	})
})


const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApiSlice.endpoints.signIn.matchFulfilled,
			(state, { payload }) => {
				console.log('signIn');
				state.user = payload.user;
				state.token = payload.token;
			}
		);
		builder.addMatcher(authApiSlice.endpoints.signOut.matchFulfilled, (state) => {
			console.log('signOut');
			state.user = null;
			state.token = null;
		});
	},
});
export const selectCurrentUser = (state: RootState) => state.auth.user;

export const {useSignInMutation, useSignOutMutation, useRegisterUserMutation} = authApiSlice

export default authSlice.reducer;
