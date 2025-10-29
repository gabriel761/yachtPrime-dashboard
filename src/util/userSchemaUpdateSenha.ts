import { z } from "zod";

const textMessage = { message: "Texto inválido" };

export const userSchemaUpdateSenha = z
    .object({
        senha: z
            .string(textMessage)
            .max(150, { message: "Máximo de 150 caracteres" })
            .min(6, { message: "Mínimo de 6 caracteres" }),
        confirmarSenha: z.string(textMessage),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
        message: "As senhas não coincidem",
        path: ["confirmarSenha"], // Mostra o erro no campo "confirmarSenha"
    });

export type UserFormUpdateSenha = z.infer<typeof userSchemaUpdateSenha>;
