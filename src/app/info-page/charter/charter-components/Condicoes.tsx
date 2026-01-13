import ListDisc from "../../info-page-components/ListDisc";
import { Condicao } from "@/types/applicationTypes/charter/Condicoes";

const Condicoes = ({condicoes}: {condicoes: Condicao[]}) => {
    const stringArray = condicoes.map((item) => {
        return item.opcao
    })

    return (
        <div>
            <h3 className="font-bold text-xl mt-8">Reservas e principais condições</h3>
            <ListDisc data={stringArray} />
        </div>
    );
}

export default Condicoes;