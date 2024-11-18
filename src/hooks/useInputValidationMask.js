import { useState } from "react";



const validateSchemaFromSchema = (schema) => {
    let dto = {}
    for (const property in schema) {
        const input = schema[property]
        if (input.isValid) {
            dto[property] = input.value
        } else {
            throw new Error("Um ou mais campos precisam de correção")
        }
    }
    return dto

}

 const checkRequiredFieldsFromSchema = (schema) => {
    let error = false
    for (const property in schema) {
        const input = schema[property]
        if (input.required && input.value === "") {
            input.errorMessage = "Campo obrigatório"
            error = true
        } else if (input.errorMessage === "Campo obrigatório") {
            input.errorMessage = ""
        }
        schema[property] = input
    }
    return { message: `Um ou mais campos obrigatórios não preenchidos`, error, schema }
}

export default function useInputValidationMask(initialSchema){
    const [validationObj, setValidationObj] = useState(initialSchema)
    let inputSchema = null
    function inputValidationMask(inputName, inputValue) {
       let schema = validationObj
        inputSchema = validationObj[inputName]; 
        let inputIsValid = inputSchema.validationMethod(inputValue, inputName)
        inputSchema.isValid = inputIsValid
        inputSchema.value = inputSchema.maskMethod(inputValue, inputName);
        schema[inputName]=inputSchema;
        if (inputIsValid) inputSchema.errorMessage = ""
       // if (inputSchema.required && inputSchema.value === "") inputSchema.errorMessage = "Campo obrigatório" 
        setValidationObj({...schema});
        inputSchema = null
    }

    function inputValidation(inputName, inputValue) {
        let schema = validationObj
        inputSchema = validationObj[inputName];
        let inputIsValid = inputSchema.validationMethod(inputValue, inputName)
        inputSchema.isValid = inputIsValid
        schema[inputName] = inputSchema;
        if (inputIsValid) inputSchema.errorMessage = ""
        // if (inputSchema.required && inputSchema.value === "") inputSchema.errorMessage = "Campo obrigatório" 
        setValidationObj({ ...schema });
        inputSchema = null
    }
    function inputMask(inputName, inputValue) {
        let schema = validationObj
        inputSchema = validationObj[inputName];
        inputSchema.value = inputSchema.maskMethod(inputValue, inputName);
        schema[inputName] = inputSchema;
        // if (inputSchema.required && inputSchema.value === "") inputSchema.errorMessage = "Campo obrigatório" 
        setValidationObj({ ...schema });
        inputSchema = null
    }
    function checkRequiredFields(schema){
        const result = checkRequiredFieldsFromSchema(schema)
        schema = result.schema
        setValidationObj({ ...schema })
        if(result.error){
            throw new Error(result.message)
        } 
    }
    function validateSchema(schema) {
        try {
            return validateSchemaFromSchema(schema)
        } catch (error) {
            throw error
        }
    }
    const toggleInputType = (inputName, toggle1, toggle2) => {
        let schema = validationObj
        let inputType = schema[inputName].type
        if (inputType === toggle1) schema[inputName].type = toggle2
        if (inputType === toggle2) schema[inputName].type = toggle1
        setValidationObj({ ...schema })
    }
    
    return [validationObj, inputValidation, inputMask, inputValidationMask, checkRequiredFields, validateSchema, toggleInputType]
} 


// o objeto de validação vai ser importado aqui
// o use state precisa atualizar o objeto inteiro, não apenas um dos campos
// o hook quando ativado vai receber o valor do texto do input e a chave do objeto de validação em forma de string
// a chave vai dar todos os atributos do input no objeto de validação e vai "conectar" com as abstrações do hook
// dessa forma eu só vou me preocupar em dar a chave certa no input e colocar os atributos corretos no objeto de validação
// para colocar os valores iniciais eu crio uma função que recebe um objeto com chave do nome do input e valor 
// esse objeto vai verificar o objeto de validação e vai atualizar os valores de cada objeto com o nome do input
// essa função de valores iniciais precisa retornar um erro caso um dos campos não exista

// o método de validação vai alterar o atributo "isValid"
// o método  de máscara vai alterar o atributo "value"