import { TaxaChurrasco } from "@/types/applicationTypes/charter/TaxaChurrasco";
import { Preco } from "@/types/applicationTypes/Preco";

export class TaxaChurrascoModel {
    constructor(
        public preco: Preco,
        public mensagem: string,
        public id?: number
    ){

    }
    extractData():TaxaChurrasco {
        return{
            id:this.id,
            preco:this.preco,
            mensagem:this.mensagem
        }
    }
}