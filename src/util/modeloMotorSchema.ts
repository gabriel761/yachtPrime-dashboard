import {object, z} from "zod"

const textMessage = {message: "Texto inválido"}

export const modeloMotorSchema = z.object({
    marca: z.string(textMessage).max(150, {message: "Maximo de 150 characteres "}),
    modelo: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }), 
})
export type ModeloMotorForm = z.infer<typeof modeloMotorSchema>


