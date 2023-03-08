export interface Results {
	meta: Meta;
	data: CastMember[];
}

export interface Result {
	data: CastMember;
}

export interface CastMember {
	id: string;
	name: string;
	type: number
	deleted_at: string;
	created_at: string;
	updated_at: string;
}

export interface Meta {
	total: number;
	per_page: number;
	current_page: number;
	last_page: number;
	first_page: number;
	first_page_url: string;
	last_page_url: string;
	next_page_url?: any;
	previous_page_url?: any;
}

export interface CastMemberParams {
	page?: number
	perPage?: number
	search?: string
	isActive?: boolean
}

export interface CastMemberCreate {
	name: string;
	type: number
}

export interface CastMemberUpdate {
	name: string;
	type: number
}

