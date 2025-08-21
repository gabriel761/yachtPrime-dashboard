
import { Cabine } from "./Cabine";
import { TipoCombustivel } from "../TipoCombustivel";
import { Imagem } from "../Imagem";
import { ItemSeminovo } from "../ItemSeminovo";
import { Modelo } from "../Modelo";
import { Motorizacao } from "../Motorizacao";
import { Preco } from "../Preco";
import { Propulsao } from "./Propulsao";

export type BarcoSeminovoOutput = {
    id?:number
    modelo: string;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: Motorizacao;
    potenciaTotal: number;
    combustivel: TipoCombustivel;
    propulsao: Propulsao;
    cabines: Cabine;
    procedencia: string;
    destaque?: string | null;
    preco: Preco;
    imagens: Imagem[];
    equipadoCom: ItemSeminovo[];
    videoPromocional?: string | null;
    oportunidade:boolean;
};

export type BarcoSeminovoList = {
    id: number,
    modelo: string,
    nome: string,
    tamanho: 50,
    imagem: string,
    ano: 2018,
    moeda: string,
    valor: number
}