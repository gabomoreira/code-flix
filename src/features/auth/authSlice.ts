import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';

export interface Auth {
	user: null;
	token: null;
}

type InitiaState = {
	auth: Auth | null;
};

const authSlice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null } as {
		user: null | any;
		token: null | string;
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			apiSlice.endpoints.signIn.matchFulfilled,
			(state, { payload }) => {
				console.log(payload, 'payload');
				state.token = payload.token;
				state.user = payload.user;
			}
		);
		builder.addMatcher(apiSlice.endpoints.signOut.matchFulfilled, (state) => {
			console.log('signOut');
			state.token = null;
			state.user = null;
		});
	},
});
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
