import {object, z} from "zod"

const textMessage = {message: "Texto inválido"}

export const itemSeminovoSchema = z.object({
    item: z.string(textMessage).max(150, {message: "Maximo de 150 characteres "})
})
export type ItemSeminovoForm = z.infer<typeof itemSeminovoSchema>
