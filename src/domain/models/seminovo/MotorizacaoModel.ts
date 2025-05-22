import { Motorizacao } from "@/types/applicationTypes/Motorizacao";

export class MotorizacaoModel implements Motorizacao {

    constructor(
        public modelo: string,
        public quantidade: number,
        public potencia: number,
        public horas: number,
        public ano: number,
        public observacoes?: string | null
    ) {

    }

    extractData():Motorizacao{
        return {
            modelo: this.modelo, 
            quantidade:this.quantidade,
            potencia: this.potencia, 
            horas: this.horas,
            ano: this.ano, 
            observacoes: this.observacoes
        }
    }
}