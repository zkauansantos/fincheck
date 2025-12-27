import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { authService } from "@/app/services/authService";
import { SigninParams } from "@/app/services/authService/signin";

import { FormData, loginSchema } from "./schemas/loginSchema";

import useAuth from "@/app/hooks/useAuth";

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

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ email, password }: SigninParams) => {
      return authService.signin({ email, password });
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { email, password } = data;

      const { accessToken } = await mutateAsync({ email, password });

      signin(accessToken);
    } catch {
      toast.error("Credenciais inválidas!");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isPending,
  };
}
