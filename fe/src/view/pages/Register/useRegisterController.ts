import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { authService } from "@/app/services/authService";
import { SignupParams } from "@/app/services/authService/signup";

import { FormData, registerSchema } from "./schemas/registerSchema";

import useAuth from "@/app/hooks/useAuth";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";

export default function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ name, email, password }: SignupParams) => {
      return authService.signup({ name, email, password });
    },
  });

  const { signin } = useAuth();
  const { handleError } = useErrorHandler();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { name, email, password } = data;

      const { accessToken } = await mutateAsync({ name, email, password });

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
