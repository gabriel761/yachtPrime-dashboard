import { Preco } from "@/types/applicationTypes/Preco";

export class PrecoModel implements Preco {
    constructor(
        public moeda: string,
        public valor: string
    ){

    }

    extractData():Preco{
        return {
            moeda: this.moeda,
            valor: this.valor
        }
    }
}