import { TripulacaoSkipper } from "@/types/applicationTypes/charter/TripulacaoSkipper";

export class TripulacaoSkipperModel {
    constructor(
       public id: number,
       public opcao: string 
    ){

    }
    extractData():TripulacaoSkipper {
        return{
            id:this.id,
            opcao: this.opcao
        }
    }
}