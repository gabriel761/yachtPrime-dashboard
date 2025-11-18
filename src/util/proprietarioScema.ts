import { object, z } from "zod"

const textMessage = { message: "Texto inválido" }
const numberMessage = { message: "Número inválido" }
const selectMessage = { message: "Selecione 1 opção" }

const numeroMinimoImagens = 3

const currentYear = new Date().getFullYear();


export const proprietarioSchema = z.object({ id: z.number({message: "id proprietário inválido"}).positive({message: "id proprietário inválido"}).optional(),
    nome: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }).min(1,{message: "Campo obrigatório"}), 
    email: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }).min(1, { message: "Campo obrigatório" }), 
    telefone: z.string(textMessage).min(1, { message: "Campo obrigatório" }).refine((v) => {
        const digits = v.replace(/\D/g, "");
        // internacional
        if (v.startsWith("+")) {
            return digits.length >= 8 && digits.length <= 15;
        }
        // fallback BR: 10 ou 11 dígitos → OK
        return digits.length === 10 || digits.length === 11;
    }, `Telefone inválido (telefones internacionais devem iniciar com "+")`)
})


export type ProprietarioForm = z.infer<typeof proprietarioSchema>