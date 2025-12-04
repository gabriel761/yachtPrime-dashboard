import { Preco } from "@/types/applicationTypes/Preco";
import { Passageiros } from "@/types/applicationTypes/charter/Passageiros";
import { ItemCharter } from "@/types/applicationTypes/charter/ItemCharter";
import { Imagem } from "@/types/applicationTypes/Imagem";
import { ConsumoCombustivel } from "@/types/applicationTypes/charter/ConsumoCombustivel";
import { RoteiroCharter } from "@/types/applicationTypes/charter/RoteiroCharter";
import { TipoPasseio } from "@/types/applicationTypes/charter/TipoPasseio";
import { TripulacaoSkipper } from "@/types/applicationTypes/charter/TripulacaoSkipper";
import { TaxaChurrasco } from "@/types/applicationTypes/charter/TaxaChurrasco";
import { BarcoCharter } from "@/types/applicationTypes/charter/BarcoCharter";
import { Modelo } from "@/types/applicationTypes/Modelo";
import { Proprietario } from "@/types/applicationTypes/Proprietario";

export class BarcoCharterModel {
    constructor(
        public ativo: boolean,
        public modelo: string,
        public nome: string,
        public ano: number,
        public tamanho: number,
        public cidade: string,
        public preco: Preco,
        public passageiros: Passageiros,
        public petFriendly: PetFriendly,
        public itensDisponiveis: ItemCharter[],
        public imagens: Imagem[],
        public consumoCombustivel: ConsumoCombustivel,
        public roteiros: RoteiroCharter[],
        public horaExtra: Preco,
        public proprietario: Proprietario,
        public tipoPasseio: TipoPasseio,
        public tripulacaoSkipper: TripulacaoSkipper,
        public aluguelLancha: Preco,
        public taxaChurrasco: TaxaChurrasco,
        public videoPromocional: string,
        public id?: number,
    ){


        
    }

    setId(id: number){
        this.id = id
    }

    extractData(): BarcoCharter {
        return {
            id: this.id,
            ativo: this.ativo,
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            cidade: this.cidade,
            preco: this.preco,
            passageiros: this.passageiros,
            petFriendly: this.petFriendly,
            itensDisponiveis: this.itensDisponiveis,
            imagens: this.imagens,
            consumoCombustivel: this.consumoCombustivel,
            roteiros: this.roteiros,
            horaExtra: this.horaExtra,
            proprietario: this.proprietario,
            tipoPasseio: this.tipoPasseio,
            tripulacaoSkipper: this.tripulacaoSkipper,
            aluguelLancha: this.aluguelLancha,
            taxaChurrasco: this.taxaChurrasco,
            videoPromocional: this.videoPromocional
        }
    }
}