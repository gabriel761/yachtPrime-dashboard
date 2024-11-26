import { Modelo } from "@/types/applicationTypes/Modelo";

export class ModeloModel implements Modelo {
    constructor (
        public id: number,
        public marca: string,
        public modelo: string,
    ){

    }
    extractData():Modelo{
        return {
            id: this.id,
            marca: this.marca,
            modelo: this.modelo
        }
    }
}