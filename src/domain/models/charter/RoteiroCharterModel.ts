import { RoteiroCharter, RoteiroCharterForm, RoteiroCharterWithId } from "@/types/applicationTypes/charter/RoteiroCharter";
import { Preco } from "@/types/applicationTypes/Preco";

export class RoteiroCharterModel {

    private roteiros!: RoteiroCharter[]
    private roteirosForm!: RoteiroCharterForm[]

    constructor() {}

    setRoteiros(roteiros: RoteiroCharterForm[]) {
      const formatedRoteiros:RoteiroCharter[] =  roteiros.map((input) => {
            const roteiro: RoteiroCharter = {
                nome: input.nome,
                descricao: input.descricao,
                preco: {
                    moeda: input.moeda,
                   valor: input.preco
                },
                detalhesPagamento: input.detalhesPagamento
            }
            return roteiro
        })
        this.roteiros = formatedRoteiros
    }

    setRoteirosForm(roteiros: RoteiroCharterWithId[]){
        const formatedRoteirosForm: RoteiroCharterForm[] = roteiros.map((input) => {
            const roteiro: RoteiroCharterForm = {
                id: input.id,
                nome: input.nome,
                descricao: input.descricao,
                moeda: input.preco.moeda,
                preco: input.preco.valor,
                detalhesPagamento: input.detalhesPagamento
            }
            return roteiro
        })
        this.roteirosForm = formatedRoteirosForm    
    }

    extractData(): RoteiroCharter[] {
        return this.roteiros
    }
    extractDataForm(): RoteiroCharterForm[]{
        return this.roteirosForm
    }
}