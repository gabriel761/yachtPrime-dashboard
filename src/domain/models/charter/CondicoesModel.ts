import { Condicao } from "@/types/applicationTypes/charter/Condicoes";

export class CondicoesModel {
    constructor(
      public  id: string,
      public  opcao: string
    ){
        
    
    }

    extractData(): Condicao{
        return{
            id: this.id,
            opcao: this.opcao
        }
    }
}