import { Imagem } from "../Imagem";
import { Modelo } from "../Modelo";
import { Preco } from "../Preco";
import { Proprietario } from "../Proprietario";
import { Condicao } from "./Condicoes";
import { ConsumoCombustivel } from "./ConsumoCombustivel";
import { ItemCharter } from "./ItemCharter";
import { Passageiros } from "./Passageiros";
import { RoteiroCharter, RoteiroCharterForm } from "./RoteiroCharter";
import { TaxaChurrasco } from "./TaxaChurrasco";
import { TipoPasseio } from "./TipoPasseio";
import { TripulacaoSkipper } from "./TripulacaoSkipper";

export type BarcoCharter = {
    codigo?: string
    ativo: boolean;
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    cidade: string;
    preco: Preco;
    passageiros: Passageiros;
    roteiros: RoteiroCharter[];
    petFriendly: PetFriendly;
    itensDisponiveis: ItemCharter[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivel;
    proprietario: Proprietario;
    tipoPasseio: TipoPasseio;
    tripulacaoSkipper: TripulacaoSkipper;
    horaExtra: Preco;
    aluguelLancha: Preco;
    condicoes: Condicao[];
    taxaChurrasco: TaxaChurrasco;
    videoPromocional: string | null
}

export type BarcoCharterUpdate = {
    codigo?: string
    ativo: boolean;
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    preco: Preco;
    cidade: string;
    passageiros: Passageiros;
    roteiros: RoteiroCharterForm[];
    petFriendly: PetFriendly;
    itensDisponiveis: ItemCharter[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivel;
    proprietario: Proprietario;
    tipoPasseio: TipoPasseio;
    tripulacaoSkipper: TripulacaoSkipper;
    horaExtra: Preco;
    aluguelLancha: Preco;
    condicoes: Condicao[];
    taxaChurrasco: TaxaChurrasco;
    videoPromocional: string | null
}


export type BarcoCharterList = {
    codigo: string,
    ativo: boolean,
    imagem: string,
    cidade: string,
    modelo: string,
    tamanho: number,
    preco: Preco,
    passageiros: number
}

export type BarcoCharterRelated = {
    codigo: string,
    modelo: string,
    imagem: string,
    preco: Preco,
}