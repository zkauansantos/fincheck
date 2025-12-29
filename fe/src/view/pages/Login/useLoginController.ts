import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { FormData, loginSchema } from "./schemas/loginSchema";

import useAuth from "@/app/hooks/useAuth";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import { useSignInMutation } from "@/app/services/authService/hooks/useSignInMutation";

export default function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      "email": "user@example.com",
      "password": "password123"
    }
  });

  const { signIn, isPending } = useSignInMutation();
  const { signin } = useAuth();
  const { handleError } = useErrorHandler();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { email, password } = data;

      const { accessToken } = await signIn({ email, password });

      signin(accessToken);
    } catch (error) {
      handleError(error);
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}
