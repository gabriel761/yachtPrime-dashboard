import { Preco } from "@/types/applicationTypes/Preco";

type props = { modelo: string, ano: number, preco: Preco }

const TitleAndPrice = ({modelo, ano, preco}:props) => {
    return ( 
        <div className="mb-10">
            <h1 className="font-title text-4xl">{modelo} {ano}</h1>
            <h2 className="font-title text-xl">A partir de {preco.moeda} {preco.valor}</h2>
        </div>
     );
}
 
export default TitleAndPrice;