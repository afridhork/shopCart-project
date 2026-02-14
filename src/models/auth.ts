export interface AuthSigninRequest {
  username: string;
  password: string;
}

export interface AuthSigninResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
