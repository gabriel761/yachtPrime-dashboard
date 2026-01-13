import TwoColTable from "../../info-page-components/TwoColTable";

const DataTable = () => {
    const data = [
        {
            key: "Id",
            data: "RJ 135"
        },
        {
            key: "Passageiros dia",
            data: "Até 15 +1"
        },
        {
            key: "Passageiros pernoite",
            data: "6 +1"
        },
        {
            key: "Duração do passeio",
            data: "5 horas"
        },
        {
            key: "Tipo de passeio",
            data: "Day use"
        },
        {
            key: "Pernoite",
            data: "Sob consulta"
        },
        {
            key: "Pet friendly",
            data: "Apenas pequeno porte"
        },
        {
            key: "Embarque principal",
            data: "Marina da glória"
        },
        {
            key: "Embarque alternativo",
            data: "Iate clube Niterói (taxa extra R$ 100"
        },
        {
            key: "Horários",
            data: "das 08h às 13h ou das 14h às 20h"
        },
        {
            key: "Ponto de encontro",
            data: "Restaurante Kitchen"
        }
    ]
    return (
        
            <TwoColTable data={data} />
        
    );
}

export default DataTable;