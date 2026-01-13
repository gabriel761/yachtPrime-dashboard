import { ItemCharter } from "@/types/applicationTypes/charter/ItemCharter";
import ListDisc from "../../info-page-components/ListDisc";

const ItensDisponiveis = ({itensCharter}:{itensCharter: ItemCharter[]}) => {

    const stringArray = itensCharter.map((item) => {
        return item.quantidade + " " + item.item
    })
    
    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold">Itens Disponíveis:</h3>
            <ListDisc data={stringArray}/>
        </div>
    );
}

export default ItensDisponiveis;