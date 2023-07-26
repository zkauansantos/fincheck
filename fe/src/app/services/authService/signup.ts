import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  jwtAcessToken: string;
}

export async function signup({ name, email, password }: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>("/auth/signup", {
    name,
    email,
    password,
  });

  return data;
}
