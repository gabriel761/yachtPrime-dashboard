import { BarcoSeminovoOutput } from "@/types/applicationTypes/seminovo/BarcoSeminovo";
import { Cabine } from "@/types/applicationTypes/seminovo/Cabine";
import { TipoCombustivel } from "@/types/applicationTypes/TipoCombustivel";
import { Imagem } from "@/types/applicationTypes/Imagem";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import { Modelo } from "@/types/applicationTypes/Modelo";
import { Motorizacao } from "@/types/applicationTypes/Motorizacao";
import { Preco } from "@/types/applicationTypes/Preco";
import { Propulsao } from "@/types/applicationTypes/seminovo/Propulsao";
import { Proprietario } from "@/types/applicationTypes/Proprietario";

export class BarcoSeminovoModel implements BarcoSeminovoOutput {
    public id?: number
    constructor(
        public modelo: string,
        public nome: string,
        public ano: number,
        public tamanho: number,
        public motorizacao: Motorizacao,
        public potenciaTotal: number,
        public combustivel: TipoCombustivel,
        public propulsao: Propulsao,
        public cabines: Cabine,
        public proprietario: Proprietario,
        public procedencia: string,
        public destaque: string,
        public preco: Preco,
        public imagens: Imagem[],
        public equipadoCom: ItemSeminovo[],
        public oportunidade: boolean,
        public videoPromocional?: string | null,
    ) {

    }
    setId(id: number) {
        this.id = id
    }
    extractData(): BarcoSeminovoOutput {
        return {
            id: this.id,
            modelo: this.modelo,
            nome: this.nome,
            ano: this.ano,
            tamanho: this.tamanho,
            motorizacao: this.motorizacao,
            potenciaTotal: this.potenciaTotal,
            combustivel: this.combustivel,
            propulsao: this.propulsao,
            cabines: this.cabines,
            proprietario: this.proprietario,
            procedencia: this.procedencia,
            destaque: this.destaque,
            preco: this.preco,
            imagens: this.imagens,
            equipadoCom: this.equipadoCom,
            videoPromocional: this.videoPromocional,
            oportunidade: this.oportunidade
        }
    }
}