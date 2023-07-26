import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z
    .string()
    .email("Informe um e-mail válido")
    .nonempty("O e-mail é obrigatório"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 digitos."),
});

export type FormData = z.infer<typeof registerSchema>;
