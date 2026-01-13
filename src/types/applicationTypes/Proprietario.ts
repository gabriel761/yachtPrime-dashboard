import { User } from "./User"

export type Proprietario = {
    id?: number,
    nome: string,
    email?: string,
    telefone: string
}

export type ProprietarioForEdit = {
    id?: number,
    nome: string,
    email?: string,
    telefone: string
    usuarios: User[]
}

