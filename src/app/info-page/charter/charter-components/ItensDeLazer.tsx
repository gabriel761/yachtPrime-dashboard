import ListDisc from "../../info-page-components/ListDisc";

const ItensDeLazer = () => {
    const data = [
        "Som ambiente com Bluetooth",
        "2 Caixas tipo cooler",
        "Macarrão flutuante",
        "Tapete flutuante"
    ]
    return (
        <div className="mt-10">
            <h3 className="text-xl font-bold">Itens de Lazer:</h3>
            <ListDisc data={data} />
        </div>
    );
}

export default ItensDeLazer;