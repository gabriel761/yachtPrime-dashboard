import { Cabine } from "@/types/applicationTypes/seminovo/Cabine";

export class CabineModel implements Cabine {
    constructor(
        public passageiros: number,
        public tripulacao: number
    ){

    }
    extractData():Cabine{
        return{
            passageiros: this.passageiros,
            tripulacao: this.tripulacao
        }
    }
}