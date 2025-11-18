export const formatPrice = (rawValue:string) => {
    let numericValue = rawValue.replace(/\D/g, "");

    // Converte para decimal com duas casas
    numericValue = (parseInt(numericValue || "0", 10) / 100).toFixed(2);

    // Formata para o padrão brasileiro
    return `${numericValue
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export const formatPhone = (rawValue: string) => {
    let numericValue = rawValue.replace(/\D/g, "");

    // limite internacional (e.164)
    if (numericValue.length > 15) numericValue = numericValue.slice(0, 15);

    // se começar com + → internacional explícito
    if (rawValue.startsWith("+")) {
        return "+" + numericValue;
    }

    // FORMATAÇÃO BR como fallback (quando não tem +)
    // (XX) XXXXX-XXXX ou (XX) XXXX-XXXX se tiver só 10 dígitos
    if(numericValue.length == 0){
        return ""
    }
    if (numericValue.length <= 2 && numericValue.length != 0) {
        return `(${numericValue}`;
    }
    if (numericValue.length <= 6) {
        return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    }
    if (numericValue.length <= 10) {
        return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
    }
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
};


export const generateDateString = () =>{
    return new Date().toUTCString().replaceAll(",", "").replaceAll(" ", "-").replaceAll(":", "_")
}