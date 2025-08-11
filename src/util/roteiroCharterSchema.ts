import { z } from "zod";

const textMessage = { message: "Texto inválido" }
const numberMessage = { message: "Número inválido" }
const selectMessage = { message: "Selecione 1 opção" }

export const roteiroCharterSchema = z.object({
    nome: z.string(textMessage).max(150, {message: "Maximo de 150 characteres "}),
    descricao: z.string(textMessage).max(250, { message: "Maximo de 250 characteres " }),
    moeda: z.string(textMessage).min(1, selectMessage).max(50),
    preco: z.string(numberMessage).min(1, {message:"Preço inválido"}),
    detalhesPagamento: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }),
})
export type RoteiroCharterSchema = z.infer<typeof roteiroCharterSchema>