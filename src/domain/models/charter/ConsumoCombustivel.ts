import { ConsumoCombustivel } from "@/types/applicationTypes/charter/ConsumoCombustivel";
import { TipoCombustivel } from "@/types/applicationTypes/TipoCombustivel";
import { Preco } from "@/types/applicationTypes/Preco";

export class ConsumoCombustivelModel {
    constructor(
        
        private litrosHora: number,
        private precoHora: Preco,
        private tipoCombustivel: TipoCombustivel,
        private id?: number,
    ){

    }
    extractData():ConsumoCombustivel{
        return{
            id:this.id,
            litrosHora: this.litrosHora,
            tipoCombustivel: this.tipoCombustivel,
            precoHora: this.precoHora,
        }
    }
}