export interface SignInResponse {
  user: User;
  token: Token;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface Token {
  type: string;
  token: string;
  expires_at: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  remember_me_token?: any;
  created_at: string;
  updated_at: string;
}