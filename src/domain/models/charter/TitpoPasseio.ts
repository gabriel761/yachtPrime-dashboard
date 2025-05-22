import { TipoPasseio } from "@/types/applicationTypes/charter/TipoPasseio";

export class TipoPasseioModel {
    constructor(
        public id:number,
        public opcao: string
    ){

    }
    extractData(): TipoPasseio {
        return{
            id:this.id,
            opcao: this.opcao
        }
    }
}