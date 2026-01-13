import { BarcoSeminovoOutput } from "@/types/applicationTypes/seminovo/BarcoSeminovo";

const DadosBarco = ({ dataSeminovo }: { dataSeminovo: BarcoSeminovoOutput }) => {
    const data = [
        {
            key: "Id",
            data: "156"
        },
        {
            key: "Ano",
            data: "2015"
        },
        {
            key: "Motorização",
            data: "2 Man de 1400 HP"
        },
        {
            key: "Potência total",
            data: "2.800 HP"
        },
        {
            key: "Combustível",
            data: "Diesel"
        },
        {
            key: "Propulsão",
            data: "Eixo direto pé de galinha"
        },
        {
            key: "Cabines",
            data: "4 +1"
        },
        {
            key: "Procedência",
            data: "Brasil"
        },
        {
            key: "Destaque",
            data: "Guardada no seco 315 horas"
        }
    ]
    return (
        <table className="w-full font-light">
            <tbody>
                <tr className="w-full">
                    <td className="w-[50%] ">Ano</td>
                    <td className="w-[50%]">{dataSeminovo.ano}</td>
                </tr>
                <tr className="w-full">
                    <td className="w-[50%] ">Motorização</td>
                    <td className="w-[50%]">{dataSeminovo.motorizacao.quantidade}x {dataSeminovo.motorizacao.modelo} de {dataSeminovo.motorizacao.potencia}</td>
                </tr>
                <tr className="w-full">
                    <td className="w-[50%] ">Potência Total</td>
                    <td className="w-[50%]">{dataSeminovo.potenciaTotal}</td>
                </tr>
                <tr className="w-full">
                    <td className="w-[50%] ">Combustível</td>
                    <td className="w-[50%]">{dataSeminovo.combustivel.opcao}</td>
                </tr>
                <tr className="w-full">
                    <td className="w-[50%] ">Propulsão</td>
                    <td className="w-[50%]">{dataSeminovo.propulsao.opcao}</td>
                </tr>
                <tr className="w-full">
                    <td className="w-[50%] ">Cabines</td>
                    <td className="w-[50%]">{dataSeminovo.cabines.passageiros} + {dataSeminovo.cabines.tripulacao}</td>
                </tr>
                <tr className="w-full">
                    <td className="w-[50%] ">Procedência</td>
                    <td className="w-[50%]">{dataSeminovo.procedencia}</td>
                </tr>
                <tr className="w-full">
                    <td className="w-[50%] ">Destaque</td>
                    <td className="w-[50%]">{dataSeminovo.destaque}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default DadosBarco;