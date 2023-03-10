import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesReducer, {
	categoriesApiSlice,
} from '../features/categories/CategorySlice';
import { apiSlice } from '../features/api/apiSlice';
import authReducer, {authApiSlice} from '../features/auth/authSlice';

import { combineReducers, PreloadedState } from 'redux';
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
import { castMembersApiSlice } from '../features/cast-members/CastMemberSlice';

const persistConfig = {
	key: '@Codeflix',
	storage,
	whitelist: ['auth'],
};

const rootReducers = combineReducers({
	categories: categoriesReducer,
	auth: authReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
	[categoriesApiSlice.reducerPath]: apiSlice.reducer,
	[authApiSlice.reducerPath]: apiSlice.reducer,
	[castMembersApiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {

	return configureStore({
		reducer: persistedReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
	})
}

// export const store = configureStore({
// 	reducer: persistedReducer,

// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// 			},
// 		}).concat(apiSlice.middleware),
// });

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducers>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
