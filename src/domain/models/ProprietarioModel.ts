import { Proprietario } from "@/types/applicationTypes/Proprietario";

export class ProprietarioModel {
    constructor(
        public nome:string,
        public telefone: string,
        public email?: string,
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