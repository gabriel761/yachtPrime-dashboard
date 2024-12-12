import {object, z} from "zod"

const textMessage = {message: "Texto inválido"}
const numberMessage = {message: "Número inválido"}
const selectMessage = {message: "Selecione 1 opção"}

const numeroMinimoImagens = 3

const currentYear = new Date().getFullYear();
export const seminovoSchema = z.object({
    modeloMotor: z.string(textMessage).min(1, selectMessage), 
    quantidadeMotor: z.number(numberMessage).positive(numberMessage).min(1, selectMessage).max(50), 
    horasMotor: z.number(numberMessage).positive(numberMessage).min(24, { message: "Número de horas muito baixo" }).max(600000, { message: "Número de horas muito alto" }),
    anoMotor: z.number(numberMessage).positive(numberMessage).min(1950, { message: "Ano deve ser maior que 1950" }).max(currentYear, { message: "Ano deve ser menor do que o ano atual" }),
    potenciaMotor: z.number(numberMessage).positive(numberMessage).min(50, { message: "Potência muito baixa" }).max(150000, { message: "Potência muito alta" }),
    observacoesMotor: z.string(textMessage).max(200, { message: "Número máximo de caracteres: 200" }).or(z.string().length(0)),
    modelo: z.string(textMessage).min(1, selectMessage), 
    nome: z.string(textMessage).min(1, selectMessage).max(150, {message: "Maximo de 150 characteres "}), 
    ano: z.number(numberMessage).positive(numberMessage).min(1950, { message: "Ano deve ser maior que 1950" }).max(currentYear, { message: "Ano deve ser menor do que o ano atual" }),
    tamanho: z.number(numberMessage).positive(numberMessage).min(5, {message: "Número de pés muito baixo"}).max(1000, {message: "Número de pés muito alto"}),
    potenciaTotal: z.number(numberMessage).positive(numberMessage).min(50, {message:"Potência muito baixa"}).max(200000, {message: "Potência muito alta"}),
    combustivel: z.string(textMessage).min(1,selectMessage).max(50), 
    propulsao: z.string(textMessage).min(1,selectMessage).max(50), 
    moeda: z.string(textMessage).min(1,selectMessage).max(50), 
    preco: z.string(numberMessage).min(1, {message:"Preço inválido"}),
    passageirosCabine: z.number(numberMessage).positive(numberMessage).max(50, {message: "Número de cabines muito alto"}),
    tripulacaoCabine: z.number(numberMessage).positive(numberMessage).max(50, { message: "Número de cabines muito alto" }),
    procedencia: z.string(textMessage).min(1, textMessage).max(50,{message: "Número máximo de caracteres: 50"}),
    imagens: z.array(z.object({fileName: z.string(textMessage), link: z.string(textMessage)}), {message: "Erro na estrura de dados das imagens"}).min(numeroMinimoImagens, {message: `Adicione pelo menos ${numeroMinimoImagens} imagens para seu barco.`}),
    equipadoCom: z.array(z.object({ id: z.number(numberMessage), item: z.string(), quantidade: z.number(numberMessage).min(1, "Mínimo de 1 unidade de cada item") })).min(1, {message: "Adicione pelo menos 1 item"}),
    destaque: z.string(textMessage).max(100, { message: "Número máximo de caracteres: 100" }).or(z.string().length(0)),
    video: z.string(textMessage).url({ message: "Link inválido" }).or(z.string().length(0))
})
export type SeminovoForm = z.infer<typeof seminovoSchema>


