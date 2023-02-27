import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoriesReducer, {
	categoriesApiSlice,
} from '../features/categories/CategorySlice';
import { apiSlice } from '../features/api/apiSlice';
import authReducer, {authApiSlice} from '../features/auth/authSlice';

import { combineReducers } from 'redux';
import {
	FLUSH,
	PAUSE,
	PURGE,
	PERSIST,
	REGISTER,
	REHYDRATE,
	persistReducer,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'EMaritime',
	storage,
	whitelist: ['auth'],
};

const reducers = combineReducers({
	counter: counterReducer,
	categories: categoriesReducer,
	auth: authReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
	[categoriesApiSlice.reducerPath]: apiSlice.reducer,
	[authApiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
