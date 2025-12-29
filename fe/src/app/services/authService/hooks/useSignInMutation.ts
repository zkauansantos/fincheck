import { useMutation } from "@tanstack/react-query";
import { authService } from "..";

export function useSignInMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: authService.signin
  });

  return {
    isPending,
    signIn: mutateAsync
  }
}