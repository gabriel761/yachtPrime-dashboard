export const formValidationSchema = {
    motorHoras: {
        value: "",
        errorMessage: "",
        required: true,
        isValid: false,
        maskMethod: (value, inputName) => {
            return value 
        },
        validationMethod: (value, inputName) => {
            const input = formValidationSchema[inputName]
            const regex = /^\d+$/
            const isValid = regex.test(value)
            if (isValid) input.errorMessage = ""
            if (!isValid) input.errorMessage = "Digite apenas numeros"
            if (value === "") input.errorMessage = ""
            return isValid
        }
    },
    nome: {
        value: "",
        errorMessage: "",
        required: true,
        isValid: false,
        maskMethod: (value, inputName) => {
            const input = formValidationSchema[inputName]
            const words = value.split(' ');
            const capitalizedWords = words.map(word => {
                if (word.length > 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                } else {
                    return word;
                }
            });
            value = capitalizedWords.join(' ');
          return   input.value = value
        },
        validationMethod: (value, inputName) => {
            const input = formValidationSchema[inputName]
            const regex = /^[a-zA-ZÀ-ÖØ-öø-ú\s]+$/
            const isValid = regex.test(value)
            if (isValid) input.errorMessage = ""
            if (!isValid) input.errorMessage = "Digite apenas letras"
            if (value === "") input.errorMessage = ""
            return isValid
        }
    },

}


