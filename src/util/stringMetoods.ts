export const formatPrice = (rawValue:string) => {
    let numericValue = rawValue.replace(/\D/g, "");

    // Converte para decimal com duas casas
    numericValue = (parseInt(numericValue || "0", 10) / 100).toFixed(2);

    // Formata para o padrão brasileiro
    return `${numericValue
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export const generateDateString = () =>{
    return new Date().toUTCString().replaceAll(",", "").replaceAll(" ", "-").replaceAll(":", "_")
}