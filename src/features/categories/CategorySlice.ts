import { createSlice } from '@reduxjs/toolkit';
import { Result, Results } from '../../@types/Category';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';

export interface Category {
	id: string;
	name: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	deleted_at: null | string;
	description: null | string;
}

type InitiaState = {
	categories: Category[] | [];
};

const endpointUrl = `/categories`;

function deleteCategoryMutation(category: Category) {
	return {
		url: `${endpointUrl}/${category.id}`,
		method: 'DELETE'
	}
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getCategories: query<Results, void>({
			query: () => `${endpointUrl}`,
			providesTags: ['Categories'],
		}),
		deleteCategory: mutation<Result, {id: string}>({
			query: deleteCategoryMutation,
			invalidatesTags: ['Categories']
		})
	}),
});

const mockedCategories = [
	{
		id: 'a',
		name: 'Horror',
		is_active: true,
		created_at: '2023-06-25 17:39:15.014961-05',
		updated_at: '2023-06-25 17:39:15.014961-05',
		deleted_at: null,
		description:
			'Descriçao do genero explciando o que ele significa patati patata',
	},
	{
		id: 'b',
		name: 'Adventure',
		is_active: true,
		created_at: '2023-06-25 17:39:15.014961-05',
		updated_at: '2023-06-25 17:39:15.014961-05',
		deleted_at: null,
		description:
			'Descriçao do genero explciando o que ele significa patati patata',
	},
	{
		id: 'c',
		name: 'Romance',
		is_active: true,
		created_at: '2023-06-25 17:39:15.014961-05',
		updated_at: '2023-06-25 17:39:15.014961-05',
		deleted_at: null,
		description:
			'Descriçao do genero explciando o que ele significa patati patata',
	},
	{
		id: 'd',
		name: 'Action',
		is_active: true,
		created_at: '2023-06-25 17:39:15.014961-05',
		updated_at: '2023-06-25 17:39:15.014961-05',
		deleted_at: null,
		description:
			'Descriçao do genero explciando o que ele significa patati patata',
	},
	{
		id: 'e',
		name: 'Comedy',
		is_active: true,
		created_at: '2023-06-25 17:39:15.014961-05',
		updated_at: '2023-06-25 17:39:15.014961-05',
		deleted_at: null,
		description:
			'Descriçao do genero explciando o que ele significa patati patata',
	},
	{
		id: 'f',
		name: 'Thriller',
		is_active: true,
		created_at: '2023-06-25 17:39:15.014961-05',
		updated_at: '2023-06-25 17:39:15.014961-05',
		deleted_at: null,
		description:
			'Descriçao do genero explciando o que ele significa patati patata',
	},
	{
		id: 'g',
		name: 'Drama',
		is_active: true,
		created_at: '2023-06-25 17:39:15.014961-05',
		updated_at: '2023-06-25 17:39:15.014961-05',
		deleted_at: null,
		description:
			'Descriçao do genero explciando o que ele significa patati patata',
	},
];

const initialState: InitiaState = {
	categories: mockedCategories,
};

const categoriesSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		createCategory: (state, action) => {
			state.categories = [...state.categories, action.payload];
		},
		updateCategory: (state, action) => {
			const index = state.categories?.findIndex(
				(category) => category.id === action.payload.id
			);

			if (index === undefined || index < 0) return;
			state.categories[index] = action.payload;
		},
		deleteCategory: (state, action) => {
			const filteredCategories = state.categories.filter(
				(category) => category.id !== action.payload
			);
			console.log(filteredCategories);
			state.categories = filteredCategories;
		},
	},
});

export const { createCategory, updateCategory, deleteCategory } =
	categoriesSlice.actions;

export const selectCategories = (state: RootState) =>
	state.categories.categories;

export const selectCategoryPerId = (state: RootState, id: string) => {
	const category = state.categories.categories?.filter(
		(category) => category.id === id
	)[0];

	if (!category) {
		return {
			id: '',
			name: '',
			is_active: false,
			created_at: '',
			updated_at: '',
			deleted_at: '',
			description: '',
		};
	}

	return category;
};

export const { useGetCategoriesQuery, useDeleteCategoryMutation } = categoriesApiSlice;

export default categoriesSlice.reducer;
