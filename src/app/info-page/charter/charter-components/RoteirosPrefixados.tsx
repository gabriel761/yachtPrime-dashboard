
import { RoteiroCharter } from "@/types/applicationTypes/charter/RoteiroCharter";

const RoteirosPrefixados = ({ roteiros }: { roteiros: RoteiroCharter[] }) => {
    const diasDaSemana = [
        {
            key: "Urca e Praia Vermelha",
            data: "R$ 500",
        },
        {
            key: "Cagarras ou Itaipu",
            data: "R$ 800",
        },
    ]
    const finsDeSemana = [
        {
            key: "Urca e Praia Vermelha",
            data: "R$ 1500",
        },
        {
            key: "Cagarras ou Itaipu",
            data: "R$ 1800",
        },
    ]


    return (
        <div className="mt-10">
            <h3 className="font-bold text-xl text-center w-[50%] mb-5">Roteiros prefixados: </h3>
            {
                roteiros.map((roteiro, index) => (
                    <div key={index}>
                        <h4 className="font-bold text-lg">{roteiro.nome}</h4>
                        <p >{roteiro.descricao}</p>
                        <p >{roteiro.preco.moeda}{roteiro.preco.valor}</p>
                        <p className="mb-6">{roteiro.detalhesPagamento}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default RoteirosPrefixados;