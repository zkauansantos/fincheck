import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Informe um e-mail válido")
    .nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 digitos."),
});

export type FormData = z.infer<typeof loginSchema>;
