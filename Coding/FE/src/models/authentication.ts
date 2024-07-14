export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginReturnedDataFounded {
  status: number;
  success: boolean;
  data: LoginReturnedDataIsFound;
}

export interface LoginDataNotFoundOrForrbiden {
  status: number;
  success: boolean;
  data: {
    message: string;
    statusCode: number;
  }
}

export interface LoginReturnedDataIsFound {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface LoginReturnedDataGotError {
  error: LoginNotFound;
}

export interface User {
  firstName: string;
 lastName: string;
  password: string;
    email: string;
  username: string;
  role: string;
}

export interface LoginNotFound {
  message: string;
  status: number;
}

export interface SignupInput {
  username: string;
  email: string;
  password: string;
   firstName: string;
 lastName: string;
}

export type ErrorResponse = {
  message: string;
  status: number;
};