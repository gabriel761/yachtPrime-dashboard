import { Imagem } from "../Imagem";
import { Modelo } from "../Modelo";
import { Preco } from "../Preco";
import { Proprietario } from "../Proprietario";
import { ConsumoCombustivel } from "./ConsumoCombustivel";
import { ItemCharter } from "./ItemCharter";
import { Passageiros } from "./Passageiros";
import { RoteiroCharter, RoteiroCharterForm } from "./RoteiroCharter";
import { TaxaChurrasco } from "./TaxaChurrasco";
import { TipoPasseio } from "./TipoPasseio";
import { TripulacaoSkipper } from "./TripulacaoSkipper";

export type BarcoCharter = {
    id?: number;
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
    taxaChurrasco: TaxaChurrasco;
    videoPromocional: string | null
}

export type BarcoCharterUpdate = {
    id?: number;
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
    taxaChurrasco: TaxaChurrasco;
    videoPromocional: string | null
}


export type BarcoCharterList = {
    id: number,
    imagem: string,
    nome: string,
    modelo: string,
    tamanho: number,
    preco: Preco,
    passageiros: number
}