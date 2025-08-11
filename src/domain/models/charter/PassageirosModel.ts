import { Passageiros } from "@/types/applicationTypes/charter/Passageiros";

export class PassageirosModel {
    constructor(
        public passageiros: number,
        public passageirosPernoite: number | null,
        public tripulacao: number,
        public id?: number
    ) {

    }

    extractData(): Passageiros {
        return {
            id: this.id,
            passageiros: this.passageiros,
            passageirosPernoite: this.passageirosPernoite,
            tripulacao: this.tripulacao
        }
    }
}