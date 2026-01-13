import { z } from "zod";

const textMessage = { message: "Texto inválido" }
const numberMessage = { message: "Número inválido" }
const selectMessage = { message: "Selecione 1 opção" }

export const condicaoCharterSchema = z.object({
    opcao: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }).min(1, { message: "Campo obrigatório" }),
    
})
export type CondicaoCharterSchema = z.infer<typeof condicaoCharterSchema>