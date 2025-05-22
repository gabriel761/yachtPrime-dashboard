import { TipoCombustivel } from "../TipoCombustivel.js";
import { Preco} from "../Preco.js";

export type ConsumoCombustivel = {
    id?:number,
    litrosHora: number;
    precoHora: Preco;
    tipoCombustivel: TipoCombustivel
}
