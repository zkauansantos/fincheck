import { useMutation } from "@tanstack/react-query";
import { authService } from "..";

export function useSignUpMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: authService.signup,
  });

  return {
    signUp: mutateAsync,
    isPending,
  }

}