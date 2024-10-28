export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface GetUserParams {
  email: string;
  password: string;
}