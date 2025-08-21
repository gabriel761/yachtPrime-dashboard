import { SeminovoForm } from "@/util/seminovoValidationSchema";
import { BarcoSeminovoModel } from "../models/seminovo/BarcoSeminovoModel";
import { MotorizacaoModel } from "../models/seminovo/MotorizacaoModel";
import { CabineModel } from "../models/seminovo/CabineModel";
import { PrecoModel } from "../models/PrecoModel";
import { ImagemModel } from "../models/ImagemModel";
import { Modelo } from "@/types/applicationTypes/Modelo";
import { TipoCombustivel } from "@/types/applicationTypes/TipoCombustivel";
import { Propulsao } from "@/types/applicationTypes/seminovo/Propulsao";

export class SeminovoService {
    async prepareForSubmitSeminovo(data: SeminovoForm,  imageFirebaseHandling: Function){
        const formModelo:string = data.modelo
        const formCombustivel: TipoCombustivel = JSON.parse(data.combustivel)
        const formPropulsao: Propulsao = JSON.parse(data.propulsao)

        const motorizacaoModel = new MotorizacaoModel(data.modeloMotor, data.quantidadeMotor, data.potenciaMotor, data.horasMotor, data.anoMotor)
        const cabineModel = new CabineModel(data.passageirosCabine, data.tripulacaoCabine)
        const precoModel = new PrecoModel(data.moeda, data.preco)
        
        const cabineData = cabineModel.extractData()
        const motorizacaoData = motorizacaoModel.extractData()
        const precoData = precoModel.extractData()

        const imageLinks = await imageFirebaseHandling(data.imagens, "seminovos")
        const barcoSeminovoModel = new BarcoSeminovoModel(formModelo, data.nome, data.ano, data.tamanho, motorizacaoData, data.potenciaTotal, formCombustivel, formPropulsao, cabineData, data.procedencia, data.destaque, precoData, imageLinks, data.equipadoCom, data.oportunidade, data.video)
        const barcoSeminovoData = barcoSeminovoModel.extractData()

        return barcoSeminovoData

    }

    async prepareForUpdateSeminovo(data: SeminovoForm, idSeminovo: number | null, imageFirebaseHandling: Function) {
        if(!idSeminovo) throw new Error("Errro de cliente: idSeminovo não pode ser nulo")
        const formModelo: string = data.modelo
        const formCombustivel: TipoCombustivel = JSON.parse(data.combustivel)
        const formPropulsao: Propulsao = JSON.parse(data.propulsao)

        const motorizacaoModel = new MotorizacaoModel(data.modeloMotor, data.quantidadeMotor, data.potenciaMotor, data.horasMotor, data.anoMotor)
        const cabineModel = new CabineModel(data.passageirosCabine, data.tripulacaoCabine)
        const precoModel = new PrecoModel(data.moeda, data.preco)
        const imagemModel = new ImagemModel()

        const cabineData = cabineModel.extractData()
        const motorizacaoData = motorizacaoModel.extractData()
        const precoData = precoModel.extractData()

        const imagensDB = await imagemModel.getImagesFromDbByIdSeminovo(idSeminovo)
        const imagensToDeleteFromFirebase = imagemModel.extractImagesToDeleteFromFirebase(data.imagens, imagensDB)
        console.log(imagensToDeleteFromFirebase)
        await imagemModel.deleteImageList(imagensToDeleteFromFirebase, "seminovos")
        const imageLinks = await imageFirebaseHandling(data.imagens, "seminovos")
        const barcoSeminovoModel = new BarcoSeminovoModel(formModelo, data.nome, data.ano, data.tamanho, motorizacaoData, data.potenciaTotal, formCombustivel, formPropulsao, cabineData, data.procedencia, data.destaque, precoData, imageLinks, data.equipadoCom, data.oportunidade, data.video)
        barcoSeminovoModel.setId(idSeminovo)
        const barcoSeminovoData = barcoSeminovoModel.extractData()

        return barcoSeminovoData

    }


 
}