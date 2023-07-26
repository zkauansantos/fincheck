import { httpClient } from "../httpClient";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  jwtAcessToken: string;
}

export async function signin({ email, password }: SigninParams) {
  const { data } = await httpClient.post<SigninResponse>("/auth/signin", {
    email,
    password,
  });

  return data;
}
