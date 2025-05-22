import { Pernoite } from "@/types/applicationTypes/charter/Pernoite";

export class PernoiteModel {
    constructor(
        public id: number,
        public opcao: boolean
    ){

    }

    extractData():Pernoite{
        return{
            id: this.id,
            opcao: this.opcao
        }
    }
}