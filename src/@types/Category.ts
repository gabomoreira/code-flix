export interface Results {
	meta: Meta;
	data: Category[];
}

export interface Result {
	data: Category;
}

export interface Category {
	id: string;
	name: string;
	deleted_at: string | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface Meta {
	to: number;
	from: number;
	path: string;
	total: number;
	per_page: number;
	last_page: number;
	current_page: number;
}
