import { z } from "zod";

const textMessage = { message: "Texto inválido" }


export const condicaoCharterUpdateSchema = z.object({
    condicoes: z.array(z.object({
        opcao: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }),
    })).min(1, { message: "Adicione pelo menos 1 condição" }),
})
export type CondicaoCharterUpdateSchema = z.infer<typeof condicaoCharterUpdateSchema>