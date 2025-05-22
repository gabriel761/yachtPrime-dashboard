import { Imagem } from "../Imagem";
import { Preco } from "../Preco";
import { ConsumoCombustivel } from "./ConsumoCombustivel";
import { ItemCharter } from "./ItemCharter";
import { Passageiros } from "./Passageiros";
import { RoteiroCharter } from "./RoteiroCharter";
import { TaxaChurrasco } from "./TaxaChurrasco";
import { TipoPasseio } from "./TipoPasseio";
import { TripulacaoSkipper } from "./TripulacaoSkipper";

export type BarcoCharter = {
    id?: number;
    modelo: string;
    nome: string | null;
    ano: number;
    tamanho: number;
    preco: Preco;
    passageiros: Passageiros;
    roteiros: RoteiroCharter[];
    petFriendly: string;
    itensDisponiveis: ItemCharter[];
    imagens: Imagem[];
    consumoCombustivel: ConsumoCombustivel;
    tipoPasseio: TipoPasseio;
    tripulacaoSkipper: TripulacaoSkipper;
    horaExtra: Preco;
    aluguelLancha: Preco;
    taxaChurrasco: TaxaChurrasco;
    videoPromocional: string | null
}