import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { authService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";

import { FormData, registerSchema } from "./schemas/registerSchema";

export default function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: ({ name, email, password }: SignupParams) => {
      return authService.signup({ name, email, password });
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { name, email, password } = data;

      const { jwtAcessToken } = await mutateAsync({ name, email, password });

      console.log(jwtAcessToken);
    } catch {
      toast.error("Ocorreu um erro ao criar sua conta");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
  };
}
