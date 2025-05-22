import { RoteiroCharter } from "@/types/applicationTypes/charter/RoteiroCharter";

export class RoteiroCharterModel {
    constructor(
        public nome: string,
        public descricao: string,
        public preco: string, 
        public detalhesPagemento: string
    ){

    }

    extractData(): RoteiroCharter {
        return{
            nome: this.nome,
            descricao: this.descricao,
            preco: this.preco,
            detalhesPagamento: this.detalhesPagemento
        }
    }
}