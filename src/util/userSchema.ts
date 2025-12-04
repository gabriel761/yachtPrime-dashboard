import { z } from "zod";

const textMessage = { message: "Texto inválido" };
const selectMessage = { message: "Selecione 1 opção" };

export const userSchema = z
    .object({
        userType: z.string(textMessage).min(1, selectMessage),
        nome: z
            .string(textMessage)
            .max(150, { message: "Máximo de 150 caracteres" }),
        email: z
            .string(textMessage)
            .max(150, { message: "Máximo de 150 caracteres" })
            .email({ message: "E-mail inválido" }),
        senha: z
            .string(textMessage)
            .max(150, { message: "Máximo de 150 caracteres" })
            .min(6, { message: "Mínimo de 6 caracteres" }),
        confirmarSenha: z.string(textMessage),
         proprietarios: z.array(z.object({
                id: z.number(),
                nome: z.string(textMessage),
                email: z.string(textMessage),
                telefone: z.string(textMessage),
            }))
    })
    .refine((data) => data.senha === data.confirmarSenha, {
        message: "As senhas não coincidem",
        path: ["confirmarSenha"], // Mostra o erro no campo "confirmarSenha"
    });

export type UserForm = z.infer<typeof userSchema>;
