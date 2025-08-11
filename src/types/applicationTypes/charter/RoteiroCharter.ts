import { Preco } from "../Preco"

export type RoteiroCharter = {
    nome: string,
    descricao: string,
    preco: Preco,
    detalhesPagamento: string
}

export type RoteiroCharterForm = {
    nome: string,
    descricao: string,
    moeda: string,
    preco: string,
    detalhesPagamento: string
}