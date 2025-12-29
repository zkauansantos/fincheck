import useAuth from "@/app/hooks/useAuth";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import { useSignUpMutation } from "@/app/services/auth/hooks/useSignUpMutation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { FormData, registerSchema } from "./schemas/registerSchema";

export default function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const { isPending, signUp } = useSignUpMutation();

  const { signin } = useAuth();
  const { handleError } = useErrorHandler();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { name, email, password } = data;

      const { accessToken } = await signUp({ name, email, password });

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
