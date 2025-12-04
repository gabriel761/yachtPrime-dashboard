import { Proprietario } from "./Proprietario"

export type User = {
    id: number,
    nome: string,
    email: string,
    userType: string
}

export type UserWithProprietarios = {
    id: number,
    nome: string,
    email: string,
    userType: string
    proprietarios: Proprietario[]
}

export type UserUpdatePasswordOnly = {
    id: number,
    senha: string
}