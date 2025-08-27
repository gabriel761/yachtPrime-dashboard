'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectModelos from "../../form-components/SelectModelos";
import InputElement from "../../../../components/InputElement";
import FormCard from "../../form-components/FormCard";
import { use, useEffect, useState } from "react";
import { useForm,  } from "react-hook-form";
import SelectCombustivel from "../../form-components/SelectCombustivel";
import SelectMoeda from "../../form-components/SelectMoeda";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadFotos from "../../form-components/UploadFotos";
import { SeminovoService } from "@/domain/service/SeminovoService";
import httpClient from "@/infra/httpClient";
import baseUrl from "@/infra/back-end-connection";
import { CustomError } from "@/infra/CustomError";
import { useModal } from "@/context/ModalContext"
import { ImagemModel } from "@/domain/models/ImagemModel";
import { auth } from "@/lib/firebase/firebaseConfig";
import SelectPetFriendly from "../../form-components/SelectPetFriendly";
import SelectTripulacaoSkipper from "../../form-components/SelectTripulacaoSkipper";
import SelectTipoPasseio from "../../form-components/SelectTipoPasseio";
import AddRoteiroModal from "../../form-components/Roteiros/AddRoteiroModal";
import { charterSchema, CharterSchema } from "@/util/charterSchema";
import Roteiros from "../../form-components/Roteiros/Roteiros";
import Itens from "../../form-components/ItensCharter/Itens";
import Spinner from "@/components/common/Spinner";
import { CharterService } from "@/domain/service/CharterService";
import { json } from "stream/consumers";
import { useRouter } from 'next/navigation';
import { BarcoCharter, BarcoCharterUpdate } from "@/types/applicationTypes/charter/BarcoCharter";
import { RoteiroCharterModel } from "@/domain/models/charter/RoteiroCharterModel";
import SelectCidade from "../../form-components/SelectCidade";

type Params = Promise<{ id: string }>

const EditarCharter = (props: { params: Params }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [output, setOutput] = useState(null)
    const { openModal } = useModal()

    const router = useRouter()
        
       const params = use(props.params)
        const idCharter = params.id ? parseInt(params.id) : null

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CharterSchema>({
        resolver: zodResolver(charterSchema),
        defaultValues: {
            taxaChurrascoMessage: "Pagamento no dia do passeio diretamente ao capitão"
        }
    })


    const getCharterData = async () => {
        try{
            const charter: BarcoCharter = await httpClient.get(`${baseUrl}/barco/charter/${idCharter}`)
            const roteirosModel = new RoteiroCharterModel()
            roteirosModel.setRoteirosForm(charter.roteiros)
            const roteirosForm = roteirosModel.extractDataForm()
            reset({
                modelo: charter.modelo ?? "",
                nome: charter.nome || "",
                ano: charter.ano,
                tamanho: charter.tamanho,
                cidade: charter.cidade,
                preco: charter.preco.valor.toString() ?? "",
                moeda: charter.preco.moeda,
                combustivel: JSON.stringify( charter.consumoCombustivel.tipoCombustivel) ,
                combustivelLitrosHora: charter.consumoCombustivel.litrosHora,
                combustivelMoeda: charter.consumoCombustivel.precoHora.moeda,
                combustivelPrecoHora: charter.consumoCombustivel.precoHora.valor,
                passageiros: charter.passageiros.passageiros,
                passageirosPernoite: charter.passageiros.passageirosPernoite || 0,
                passageirosTripulacao: charter.passageiros.tripulacao,
                video: charter.videoPromocional || "",
                imagens: charter.imagens,
                itensDisponiveis: charter.itensDisponiveis,
                petFriendly: JSON.stringify( charter.petFriendly),
                tipoPasseio: JSON.stringify( charter.tipoPasseio),
                tripulacaoSkipper: JSON.stringify( charter.tripulacaoSkipper),
                moedaAluguelLancha: charter.aluguelLancha.moeda,
                moedaTaxaChurrasco: charter.taxaChurrasco.preco.moeda,
                moedaTaxaExtra: charter.horaExtra.moeda,
                precoAluguelLancha: charter.aluguelLancha.valor,
                precoTaxaChurrasco: charter.taxaChurrasco.preco.valor,
                precoTaxaExtra: charter.horaExtra.valor,
                taxaChurrascoMessage: charter.taxaChurrasco.mensagem,
                roteiros: roteirosForm
            })
        } catch (error: any) {
            let errorMessage
            if (error instanceof CustomError) {
                errorMessage = `Status ${error.statusCode}: ${error.message}`
            } else {
                errorMessage = error.message
            }
            openModal("Erro de servidor", error.message, [{ type: "bg-danger", text: "Ok" }])
            console.error(error)
        }
    }



    const submit = async (data: any) => {
        
        console.log("funcionou")
      setIsLoading(true)
       
        const charterService = new CharterService()
        const imagemModel = new ImagemModel()
        let charterFinalData

        try {
            charterFinalData = await charterService.prepareForUpdateCharter(data, idCharter, imagemModel.prepareForUploadImageList)
            console.log(charterFinalData)
        } catch (error: any) {
            openModal("Erro de cliente", error.message, [{ type: "bg-danger", text: "Ok" }])
            console.error(error)
            setIsLoading(false);
            return;
        }

        

        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.patch(`${baseUrl}/barco/charter`, charterFinalData, token || "")
            reset()
            openModal("Sucesso!", "Barco seminovo atualizado com sucesso!", [{ type: "bg-primary", text: "Ok", onClick: () => router.replace("/list/listar-charter") }])
            await getCharterData()
        } catch (error: any) {
            let errorMessage
            if (error instanceof CustomError) {
                errorMessage = `Status ${error.statusCode}: ${error.message}`
            } else {
                errorMessage = error.message
            }
            openModal("Erro de servidor", error.message, [{ type: "bg-danger", text: "Ok" }])
            console.error(error)
        }

        
       
        setIsLoading(false)
    }

    useEffect(() => {
        getCharterData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Cadastrar Charter" />

            <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col gap-9">
                        {/* <!-- Contact Form --> */}
                        <FormCard title="Embarcação">
                            <div className="mb-4.5 w-full">
                                <SelectModelos control={control} errorMessage={errors.modelo?.message} />
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" xl:w-2/4 w-full">
                                    <InputElement register={register} registerName="nome" label="Nome" placeholder="Nome do barco" errorMessage={errors.nome?.message} />
                                </div>
                                <div className=" xl:w-1/4 w-full">
                                    <InputElement register={register} registerName="ano" label="Ano" placeholder="Ano de fabricação" type="number" errorMessage={errors.ano?.message} />
                                </div>
                                <div className="xl:w-1/4 w-full">
                                    <InputElement register={register} registerName="tamanho" label="Tamanho" placeholder="Tamanho da embarcação em pés" type="number" errorMessage={errors.tamanho?.message} />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <SelectCidade control={control} errorMessage={errors.moeda?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <SelectMoeda control={control} errorMessage={errors.moeda?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="preco" label="Preço" placeholder="0,00" errorMessage={errors.preco?.message} />
                                </div>
                            </div>


                        </FormCard>
                        <FormCard title="Consumo e combustível">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                <div className="xl:w-1/4 w-full">
                                    <SelectCombustivel control={control} errorMessage={errors.combustivel?.message} />
                                </div>
                                <div className="xl:w-1/4 w-full">
                                    <InputElement register={register} registerName="combustivelLitrosHora" label="Litros por hora" placeholder="0" type="number" errorMessage={errors.combustivelLitrosHora?.message} />
                                </div>
                                <div className="xl:w-1/4 w-full">
                                    <SelectMoeda control={control} name="combustivelMoeda" errorMessage={errors.combustivelMoeda?.message} />
                                </div>
                                <div className="xl:w-1/4 w-full">
                                    <InputElement register={register} registerName="combustivelPrecoHora" label="Preço por hora" placeholder="0,00" type="string" errorMessage={errors.combustivelPrecoHora?.message} />
                                </div>
                            </div>
                        </FormCard>
                        <FormCard title="Passageiros">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="passageiros" label="Passageiros" placeholder="0" type="number" errorMessage={errors.passageiros?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="passageirosPernoite" label="Passagerios pernoite" placeholder="0" type="number" errorMessage={errors.passageirosPernoite?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="passageirosTripulacao" label="Tripulacao" placeholder="0" type="number" errorMessage={errors.passageirosTripulacao?.message} />
                                </div>
                            </div>
                        </FormCard>
                        <FormCard title="Mídia">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <UploadFotos control={control} errorMessage={errors.imagens?.message} />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <InputElement register={register} registerName="video" label="Vídeo promocional" placeholder="https://" errorMessage={errors.video?.message} />
                                </div>
                            </div>
                        </FormCard>
                        <FormCard title="Itens do barco">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <Itens control={control} errorMessage={errors.itensDisponiveis}/>
                                </div>
                            </div>
                        </FormCard>
                        <FormCard title="Passeio">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <SelectPetFriendly control={control} errorMessage={errors.petFriendly?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <SelectTipoPasseio control={control} errorMessage={errors.tipoPasseio?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <SelectTripulacaoSkipper control={control} errorMessage={errors.tripulacaoSkipper?.message} />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <SelectMoeda control={control} name="moedaTaxaExtra" errorMessage={errors.moedaTaxaExtra?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="precoTaxaExtra" label="Taxa de hora extra" placeholder="0,00" errorMessage={errors.precoTaxaExtra?.message} />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <SelectMoeda control={control} name="moedaAluguelLancha" errorMessage={errors.moedaAluguelLancha?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="precoAluguelLancha" label="Aluguel de lancha" placeholder="0,00" errorMessage={errors.precoAluguelLancha?.message} />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <SelectMoeda control={control} name="moedaTaxaChurrasco" errorMessage={errors.moedaTaxaChurrasco?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="precoTaxaChurrasco" label="Taxa de churrasco" placeholder="0,00" errorMessage={errors.precoTaxaChurrasco?.message} />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <InputElement register={register} registerName="taxaChurrascoMessage" label="Mensagem de aviso sobre taxa de churrasco" placeholder="Pagar ao capitão no dia do evento" errorMessage={errors.taxaChurrascoMessage?.message} />
                                </div>
                            </div>

                        </FormCard>
                        <FormCard title="Roteiros de passeio">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <Roteiros control={control} errorMessage={errors.roteiros} />
                                </div>
                            </div>
                            <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                {
                                    isLoading ? <Spinner size={40} /> : (
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Atualizar seminovo
                                        </button>
                                    )
                                }
                            </div>
                            {/* <div className="mt-10 ">
                                <pre>{JSON.stringify(output)}</pre>
                            </div> */}
                        </FormCard>
                    </div>
                </form>
            </div>

        </DefaultLayout>
    )
}

export default EditarCharter