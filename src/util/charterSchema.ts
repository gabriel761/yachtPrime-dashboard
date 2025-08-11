import { z } from "zod";
import { roteiroCharterSchema } from "./roteiroCharterSchema";

const textMessage = { message: "Texto inválido" }
const numberMessage = { message: "Número inválido" }
const selectMessage = { message: "Selecione 1 opção" }


const numeroMinimoImagens = 3

const currentYear = new Date().getFullYear();

export const charterSchema = z.object({
    modelo: z.string(textMessage).min(1, selectMessage),
    nome: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }),
    ano: z.number(numberMessage).positive(numberMessage).min(1950, { message: "Ano deve ser maior que 1950" }).max(currentYear, { message: "Ano deve ser menor do que o ano atual" }),
    tamanho: z.number(numberMessage).positive(numberMessage).min(5, { message: "Número de pés muito baixo" }).max(1000, { message: "Número de pés muito alto" }),
    cidade: z.string(textMessage).min(1, selectMessage),
    moeda: z.string(textMessage).min(1, selectMessage).max(50),
    preco: z.string(numberMessage).min(1, { message: "Preço inválido" }),
    combustivel: z.string(textMessage).min(1, selectMessage).max(50),
    combustivelLitrosHora: z.number(numberMessage).positive(numberMessage).min(5, { message: "Número de pés muito baixo" }).max(1000, { message: "Número de pés muito alto" }),
    combustivelMoeda: z.string(textMessage).min(1, selectMessage).max(50),
    combustivelPrecoHora: z.string(numberMessage).min(1, { message: "Preço inválido" }),
    passageiros: z.number(numberMessage).positive(numberMessage).min(1, { message: "Número de passageiros muito baixo" }).max(1000, { message: "Número de passageiros muito alto" }),
    passageirosPernoite: z.number(numberMessage).positive(numberMessage).min(1, { message: "Número de passageiros muito baixo" }).max(1000, { message: "Número de passageiros muito alto" }),
    passageirosTripulacao: z.number(numberMessage).positive(numberMessage).min(1, { message: "Número de passageiros muito baixo" }).max(1000, { message: "Número de passageiros muito alto" }),
    video: z.string(textMessage).url({ message: "Link inválido" }).or(z.string().length(0)),
    imagens: z.array(z.object({ fileName: z.string(textMessage), link: z.string(textMessage) }), { message: "Erro na estrura de dados das imagens" }).min(numeroMinimoImagens, { message: `Adicione pelo menos ${numeroMinimoImagens} imagens para seu barco.` }),
    itensDisponiveis: z.array(z.object({
        id: z.number(numberMessage),
        item: z.string(),
        itemLazer: z.boolean(),
        quantidade: z.number(numberMessage).min(1, "Mínimo de 1 unidade de cada item")
    })).min(1, { message: "Adicione pelo menos 1 item" }),
    petFriendly: z.string(textMessage).min(1, selectMessage).max(50),
    tipoPasseio: z.string(textMessage).min(1, selectMessage).max(50),
    tripulacaoSkipper: z.string(textMessage).min(1, selectMessage).max(50),
    moedaTaxaExtra: z.string(textMessage).min(1, selectMessage).max(50),
    moedaAluguelLancha: z.string(textMessage).min(1, selectMessage).max(50),
    moedaTaxaChurrasco: z.string(textMessage).min(1, selectMessage).max(50),
    precoTaxaExtra: z.string(numberMessage).min(1, { message: "Preço inválido" }),
    precoAluguelLancha: z.string(numberMessage).min(1, { message: "Preço inválido" }),
    precoTaxaChurrasco: z.string(numberMessage).min(1, { message: "Preço inválido" }),
    taxaChurrascoMessage: z.string(textMessage).max(250, { message: "Maximo de 250 characteres " }),
    roteiros: z.array(z.object({
        nome: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }),
        descricao: z.string(textMessage).max(250, { message: "Maximo de 250 characteres " }),
        moeda: z.string(textMessage).min(1, selectMessage).max(50),
        preco: z.string(numberMessage).min(1, { message: "Preço inválido" }),
        detalhesPagamento: z.string(textMessage).max(150, { message: "Maximo de 150 characteres " }),
    }))
})
export type CharterSchema = z.infer<typeof charterSchema>

