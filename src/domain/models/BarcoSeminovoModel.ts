import { BarcoSeminovoOutput } from "@/types/applicationTypes/BarcoSeminovo";
import { Cabine } from "@/types/applicationTypes/Cabine";
import { Combustivel } from "@/types/applicationTypes/Combustivel";
import { Imagem } from "@/types/applicationTypes/Imagem";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import { Modelo } from "@/types/applicationTypes/Modelo";
import { Motorizacao } from "@/types/applicationTypes/Motorizacao";
import { Preco } from "@/types/applicationTypes/Preco";
import { Propulsao } from "@/types/applicationTypes/Propulsao";

export class BarcoSeminovoModel implements BarcoSeminovoOutput {
    constructor (
       public modelo: Modelo,
       public nome: string,
       public ano: number,
       public tamanho: number,
       public motorizacao: Motorizacao,
       public potenciaTotal: number,
       public combustivel: Combustivel,
       public propulsao: Propulsao,
       public cabines: Cabine,
       public procedencia: string,
       public destaque: string,
       public preco: Preco,
       public imagens: Imagem[],
       public equipadoCom: ItemSeminovo[],
       public videoPromocional?: string | null
    ){

    }

    extractData():BarcoSeminovoOutput{
        return {
            modelo: this.modelo,
            nome:this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            motorizacao: this.motorizacao, 
            potenciaTotal: this.potenciaTotal,
            combustivel: this.combustivel,
            propulsao: this.propulsao,
            cabines: this.cabines,
            procedencia: this.procedencia,
            destaque: this.destaque,
            preco: this.preco,
            imagens: this.imagens,
            equipadoCom: this.equipadoCom,
            videoPromocional: this.videoPromocional
        }
    }
}