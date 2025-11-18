import { Proprietario } from "@/types/applicationTypes/Proprietario";

export class ProprietarioModel {
    constructor(
        public nome:string,
        public email: string,
        public telefone: string,
        public id?: number
    ){
        
    }

    extractData():Proprietario{
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            telefone: this.telefone
        }
    }
}