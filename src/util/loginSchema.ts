import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({ message: "E-mail inválido" }).email({ message: "E-mail inválido" }),
    senha: z.string({message:"Senha inválida"}).min(1, "Campo obrigatório")
})
export type LoginSchema = z.infer<typeof loginSchema>