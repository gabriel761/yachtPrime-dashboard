import { SeminovoForm } from "@/util/seminovoValidationSchema";
import { BarcoSeminovoModel } from "../models/BarcoSeminovoModel";
import { MotorizacaoModel } from "../models/MotorizacaoModel";
import { CabineModel } from "../models/CabineModel";
import { PrecoModel } from "../models/PrecoModel";
import { ImagemModel } from "../models/ImagemModel";
import { Modelo } from "@/types/applicationTypes/Modelo";
import { Combustivel } from "@/types/applicationTypes/Combustivel";
import { Propulsao } from "@/types/applicationTypes/Propulsao";

export class SeminovoService {
    async prepareForSubmitSeminovo(data: SeminovoForm ){
        const formModelo:Modelo = JSON.parse(data.modelo)
        const formCombustivel: Combustivel = JSON.parse(data.combustivel)
        const formPropulsao: Propulsao = JSON.parse(data.propulsao)

        const motorizacaoModel = new MotorizacaoModel(data.modeloMotor, data.quantidadeMotor, data.potenciaMotor, data.horasMotor, data.anoMotor)
        const cabineModel = new CabineModel(data.passageirosCabine, data.tripulacaoCabine)
        const precoModel = new PrecoModel(data.moeda, parseFloat( data.preco))
        const imagemModel = new ImagemModel()
        const cabineData = cabineModel.extractData()
        const motorizacaoData = motorizacaoModel.extractData()
        const precoData = precoModel.extractData()

        const imageLinks = await imagemModel.uploadImageList(data.imagens)
        const barcoSeminovoModel = new BarcoSeminovoModel(formModelo , data.nome, data.ano, data.tamanho, motorizacaoData, data.potenciaTotal, formCombustivel, formPropulsao, cabineData, data.procedencia, data.destaque, precoData, imageLinks, data.equipadoCom, data.video)
        const barcoSeminovoData = barcoSeminovoModel.extractData()
        
        return barcoSeminovoData

    }
}