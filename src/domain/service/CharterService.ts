import { BarcoCharter } from "@/types/applicationTypes/charter/BarcoCharter";
import { TipoPasseio } from "@/types/applicationTypes/charter/TipoPasseio";
import { TripulacaoSkipper } from "@/types/applicationTypes/charter/TripulacaoSkipper";
import { TipoCombustivel } from "@/types/applicationTypes/TipoCombustivel";
import { Modelo } from "@/types/applicationTypes/Modelo";
import { CharterSchema } from "@/util/charterSchema";
import { ConsumoCombustivel } from "@/types/applicationTypes/charter/ConsumoCombustivel";
import { ConsumoCombustivelModel } from "../models/charter/ConsumoCombustivelModel";
import { PassageirosModel } from "../models/charter/PassageirosModel";
import { PrecoModel } from "../models/PrecoModel";
import { TaxaChurrascoModel } from "../models/charter/TaxaChurrascoModel";
import { BarcoCharterModel } from "../models/charter/BarcoCharterModel";
import { RoteiroCharterModel } from "../models/charter/RoteiroCharterModel";
import { ImagemModel } from "../models/ImagemModel";
import { Imagem } from "@/types/applicationTypes/Imagem";
import { ProprietarioModel } from "../models/ProprietarioModel";

export class CharterService {
    async prepareForSubmitCharter(data: CharterSchema, imageFirebaseHandling: Function) {
        const formModelo: string = data.modelo
        const formCombustivel: TipoCombustivel = JSON.parse(data.combustivel)
        const tipoPasseio: TipoPasseio = JSON.parse(data.tipoPasseio)
        const tripulcaoSkipper: TripulacaoSkipper = JSON.parse(data.tripulacaoSkipper)
        const petFriendly: PetFriendly = JSON.parse(data.petFriendly)
        const proprietarioModel = new ProprietarioModel(data.proprietarioNome, data.proprietarioEmail, data.proprietarioTelefone)

        const consumoCombustivelModel = new ConsumoCombustivelModel(data.combustivelLitrosHora, { moeda: data.combustivelMoeda, valor: data.combustivelPrecoHora }, formCombustivel)
        const passageirosModel = new PassageirosModel(data.passageiros, data.passageirosPernoite, data.passageirosTripulacao)
        const precoModel = new PrecoModel(data.moeda, data.preco)
        const precoTaxaExtraModel = new PrecoModel(data.moedaTaxaExtra, data.precoTaxaExtra)
        const precoAluguelLanchaModel = new PrecoModel(data.moedaAluguelLancha, data.precoAluguelLancha)
        const precoTaxaChurrascoModel = new TaxaChurrascoModel({moeda: data.moedaTaxaChurrasco, valor: data.precoTaxaChurrasco}, data.taxaChurrascoMessage)

        const roteirosModel = new RoteiroCharterModel()
        roteirosModel.setRoteiros(data.roteiros)
        const roteiros = roteirosModel.extractData()

        const consumoCombustivel = consumoCombustivelModel.extractData()
        const passageiros = passageirosModel.extractData()
        const preco = precoModel.extractData()
        const precoTaxaExtra = precoTaxaExtraModel.extractData()
        const precoAluguelLancha = precoAluguelLanchaModel.extractData()
        const precoTaxaChurrasco = precoTaxaChurrascoModel.extractData()
        const proprietarioData = proprietarioModel.extractData()


        const imageLinks = await imageFirebaseHandling(data.imagens, "charters")

        const barcoCharterModel = new BarcoCharterModel(formModelo, data.nome, data.ano, data.tamanho, data.cidade, preco, passageiros, petFriendly, data.itensDisponiveis, imageLinks, consumoCombustivel, roteiros, precoTaxaExtra, proprietarioData, tipoPasseio, tripulcaoSkipper, precoAluguelLancha, precoTaxaChurrasco, data.video )
        const barcoCharterData = barcoCharterModel.extractData()

        return barcoCharterData
    }

    async prepareForUpdateCharter(data: CharterSchema, idCharter:number | null, imageFirebaseHandling: Function) {
        if (!idCharter) throw new Error("Errro de cliente: idCharter não pode ser nulo")
        const formModelo: string = data.modelo
        const formCombustivel: TipoCombustivel = JSON.parse(data.combustivel)
        const tipoPasseio: TipoPasseio = JSON.parse(data.tipoPasseio)
        const tripulcaoSkipper: TripulacaoSkipper = JSON.parse(data.tripulacaoSkipper)
        const petFriendly: PetFriendly = JSON.parse(data.petFriendly)
        const proprietarioModel = new ProprietarioModel(data.proprietarioNome, data.proprietarioEmail, data.proprietarioTelefone)

        const consumoCombustivelModel = new ConsumoCombustivelModel(data.combustivelLitrosHora, { moeda: data.combustivelMoeda, valor: data.combustivelPrecoHora }, formCombustivel)
        const passageirosModel = new PassageirosModel(data.passageiros, data.passageirosPernoite, data.passageirosTripulacao)
        const precoModel = new PrecoModel(data.moeda, data.preco)
        const precoTaxaExtraModel = new PrecoModel(data.moedaTaxaExtra, data.precoTaxaExtra)
        const precoAluguelLanchaModel = new PrecoModel(data.moedaAluguelLancha, data.precoAluguelLancha)
        const precoTaxaChurrascoModel = new TaxaChurrascoModel({ moeda: data.moedaTaxaChurrasco, valor: data.precoTaxaChurrasco }, data.taxaChurrascoMessage)
        const imagemModel = new ImagemModel()

        const roteirosModel = new RoteiroCharterModel()
        roteirosModel.setRoteiros(data.roteiros)
        const roteiros = roteirosModel.extractData()

        const consumoCombustivel = consumoCombustivelModel.extractData()
        const passageiros = passageirosModel.extractData()
        const preco = precoModel.extractData()
        const precoTaxaExtra = precoTaxaExtraModel.extractData()
        const precoAluguelLancha = precoAluguelLanchaModel.extractData()
        const precoTaxaChurrasco = precoTaxaChurrascoModel.extractData()
        const proprietarioData = proprietarioModel.extractData()


        const imagensDB = await imagemModel.getImagesFromDbByIdCharter(idCharter)
        const imagensToDeleteFromFirebase = imagemModel.extractImagesToDeleteFromFirebase(data.imagens, imagensDB)
        await imagemModel.deleteImageList(imagensToDeleteFromFirebase, "charters")
       //const imageLinks = await imageFirebaseHandling(data.imagens, "charters")
      const imageLinks:Imagem[] = data.imagens

        const barcoCharterModel = new BarcoCharterModel(formModelo, data.nome, data.ano, data.tamanho, data.cidade, preco, passageiros, petFriendly, data.itensDisponiveis, imageLinks, consumoCombustivel, roteiros, precoTaxaExtra, proprietarioData, tipoPasseio, tripulcaoSkipper, precoAluguelLancha, precoTaxaChurrasco, data.video)

        barcoCharterModel.setId(idCharter)
        const barcoCharterData = barcoCharterModel.extractData()
        return barcoCharterData
    }
}