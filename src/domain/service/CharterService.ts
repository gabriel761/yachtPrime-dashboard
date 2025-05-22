import { BarcoCharter } from "@/types/applicationTypes/charter/BarcoCharter";
import { TipoPasseio } from "@/types/applicationTypes/charter/TipoPasseio";
import { TripulacaoSkipper } from "@/types/applicationTypes/charter/TripulacaoSkipper";
import { TipoCombustivel } from "@/types/applicationTypes/TipoCombustivel";
import { Modelo } from "@/types/applicationTypes/Modelo";
import { CharterSchema } from "@/util/charterSchema";
import { ConsumoCombustivel } from "@/types/applicationTypes/charter/ConsumoCombustivel";
import { ConsumoCombustivelModel } from "../models/charter/ConsumoCombustivel";
import { PassageirosModel } from "../models/charter/Passageiros";
import { PrecoModel } from "../models/PrecoModel";
import { TaxaChurrascoModel } from "../models/charter/TaxaChurrasco";
import { BarcoCharterModel } from "../models/charter/BarcoCharterModel";

export class CharterService {
    async prepareForSubmitCharter(data: CharterSchema, imageFirebaseHandling: Function) {
        const formModelo: Modelo = JSON.parse(data.modelo)
        const formCombustivel: TipoCombustivel = JSON.parse(data.combustivel)
        const tipoPasseio: TipoPasseio = JSON.parse(data.tipoPasseio)
        const tripulcaoSkipper: TripulacaoSkipper = JSON.parse(data.tripulacaoSkipper)

        const consumoCombustivelModel = new ConsumoCombustivelModel(data.combustivelLitrosHora, {moeda: data.combustivelPrecoHora, valor: data.combustivelMoeda}, formCombustivel.opcao)
        const passageirosModel = new PassageirosModel(data.passageiros, data.passageirosPernoite, data.passageirosTripulacao)
        const precoModel = new PrecoModel(data.moeda, data.preco)
        const precoTaxaExtraModel = new PrecoModel(data.moedaTaxaExtra, data.precoTaxaExtra)
        const precoAluguelLanchaModel = new PrecoModel(data.moedaAluguelLancha, data.precoAluguelLancha)
        const precoTaxaChurrascoModel = new TaxaChurrascoModel({moeda: data.moedaTaxaChurrasco, valor: data.precoTaxaChurrasco}, data.taxaChurrascoMessage)

        const consumoCombustivel = consumoCombustivelModel.extractData()
        const passageiros = passageirosModel.extractData()
        const preco = precoModel.extractData()
        const precoTaxaExtra = precoTaxaExtraModel.extractData()
        const precoAluguelLancha = precoAluguelLanchaModel.extractData()
        const precoTaxaChurrasco = precoTaxaChurrascoModel.extractData()


        const imageLinks = await imageFirebaseHandling(data.imagens)

        const barcoCharter = new BarcoCharterModel(formModelo.modelo, data.nome, data.ano, data.tamanho, preco, passageiros, data.petFriendly, data.itensDisponiveis, imageLinks, consumoCombustivel, data.roteiros, precoTaxaExtra, tipoPasseio, tripulcaoSkipper, precoAluguelLancha, precoTaxaChurrasco, data.video )

        return barcoCharter
    }
}