import { TipoCombustivel } from "@/types/applicationTypes/TipoCombustivel";

export class CombustivelModel implements TipoCombustivel {
    constructor(
        public id: number,
        public opcao:string,
    ){

    }
    extractData():TipoCombustivel{
        return {
            id: this.id,
            opcao: this.opcao
        }
    }
}