import { ItemCharter } from "@/types/applicationTypes/charter/ItemCharter";

export class ItemCharterModel {
    constructor(
        private id: number,
        private item: string,
        private itemLazer: boolean,
        private quantidade: number
    ){

    }

    exportData(): ItemCharter{
        return{
            id: this.id,
            item: this.item,
            itemLazer: this.itemLazer,
            quantidade: this.quantidade
        }
    }
}