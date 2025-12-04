import { z } from "zod";

const textMessage = { message: "Texto inválido" };
const selectMessage = { message: "Selecione 1 opção" };

export const userSchemaUpdate = z
    .object({
        userType: z.string(textMessage).min(1, selectMessage),
        nome: z
            .string(textMessage)
            .max(150, { message: "Máximo de 150 caracteres" }),
        email: z
            .string(textMessage)
            .max(150, { message: "Máximo de 150 caracteres" })
            .email({ message: "E-mail inválido" }),
        proprietarios: z.array(z.object({
                id: z.number({ message: "Id proprietário inválido" }),
                nome: z.string(textMessage),
                email: z.string(textMessage),
                telefone: z.string(textMessage),
            }))
        })
    

export type UserFormUpdate = z.infer<typeof userSchemaUpdate>;
