import { createSlice } from '@reduxjs/toolkit';
import { CastMember, CastMemberParams, Result, Results } from '../../@types/CastMember';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';

type InitiaState = {
	castMembers: CastMember[] | [];
};

const endpointUrl = `/cast-members`;

function parseQueryParams(params: CastMemberParams) {
	const query = new URLSearchParams();

	if (params.search) {
		query.append('search', params.search.toString());
	}

	if (params.page) {
		query.append('page', params.page.toString());
	}

	if (params.perPage) {
		query.append('per_page', params.perPage.toString());
	}

	return query.toString();
}

function getCastMembers({ page = 1, perPage = 5, search = '' }: CastMemberParams) {
	const params = { page, perPage, search };

	return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCastMemberMutation({id}: {id: string}) {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'DELETE',
	};
}

function createCastMemberMutation(CastMember: CastMember) {
	return {
		url: `${endpointUrl}`,
		method: 'POST',
		body: CastMember,
	};
}

function updateCastMemberMutation(CastMember: CastMember) {
	return {
		url: `${endpointUrl}/${CastMember.id}`,
		method: 'PUT',
		body: CastMember,
	};
}

function getCastMember({ id }: { id: string }) {
	return `${endpointUrl}/${id}`;
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getCastMembers: query<Results, CastMemberParams>({
			query: getCastMembers,
			providesTags: ['CastMembers'],
		}),
		deleteCastMember: mutation<Result, {id: string}>({
			query: deleteCastMemberMutation,
			invalidatesTags: ['CastMembers'],
		}),
		createCastMember: mutation<Result, CastMember>({
			query: createCastMemberMutation,
			invalidatesTags: ['CastMembers'],
		}),
		updateCastMember: mutation<Result, CastMember>({
			query: updateCastMemberMutation,
			invalidatesTags: ['CastMembers'],
		}),
		getCastMember: query<CastMember, { id: string }>({
			query: getCastMember,
			providesTags: ['CastMembers'],
		}),
	}),
});

export const {
	useGetCastMembersQuery,
	useDeleteCastMemberMutation,
	useCreateCastMemberMutation,
	useUpdateCastMemberMutation,
	useGetCastMemberQuery,
} = castMembersApiSlice;
