import {object, z} from "zod"

const textMessage = {message: "Texto inválido"}

export const itemCharterSchema = z.object({
    item: z.string(textMessage).max(150, {message: "Maximo de 150 characteres "}),
    itemLazer: z.boolean({ message: "boleana em item lazer inválida" }),
})
export type ItemCharterForm = z.infer<typeof itemCharterSchema>
