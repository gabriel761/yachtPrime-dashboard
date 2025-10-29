import { z } from "zod";

const textMessage = { message: "Texto inválido" };
const selectMessage = { message: "Selecione 1 opção" };

export const userSchemaUpdate = z
    .object({
        userType: z.string(textMessage).min(1, selectMessage),
        email: z
            .string(textMessage)
            .max(150, { message: "Máximo de 150 caracteres" })
            .email({ message: "E-mail inválido" }),
        })
    

export type UserFormUpdate = z.infer<typeof userSchemaUpdate>;
