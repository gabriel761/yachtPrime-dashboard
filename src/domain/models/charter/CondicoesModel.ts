import { Condicao } from "@/types/applicationTypes/charter/Condicoes";

export class CondicoesModel {
    constructor(
      public  id: number,
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