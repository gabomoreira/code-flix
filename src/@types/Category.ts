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
  description: string;
  is_active: boolean;
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
