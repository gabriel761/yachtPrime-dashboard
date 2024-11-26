import { Preco } from "@/types/applicationTypes/Preco";

export class PrecoModel implements Preco {
    constructor(
        public moeda: string,
        public valor: number
    ){

    }

    extractData():Preco{
        return {
            moeda: this.moeda,
            valor: this.valor
        }
    }
}