import { Combustivel } from "@/types/applicationTypes/TipoCombustivel";

export class CombustivelModel implements Combustivel {
    constructor(
        public id: number,
        public opcao:string,
    ){

    }
    extractData():Combustivel{
        return {
            id: this.id,
            opcao: this.opcao
        }
    }
}