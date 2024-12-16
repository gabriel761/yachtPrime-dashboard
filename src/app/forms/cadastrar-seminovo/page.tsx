'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectModelos from "../form-components/SelectModelos";
import InputElement from "../form-components/InputElement";
import SelectMotor from "../form-components/SelectMotor";
import FormCard from "../form-components/FormCard";
import SelectQuantidade from "../form-components/SelectQuantidade";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextArea from "../form-components/TextArea";
import SelectCombustivel from "../form-components/SelectCombustivel";
import SelectPropulsao from "../form-components/SelectPropulsao";
import SelectMoeda from "../form-components/SelectMoeda";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeminovoForm, seminovoSchema } from "@/util/seminovoValidationSchema";
import UploadFotos from "../form-components/UploadFotos";
import Itens from "../form-components/Itens/Itens";
import { SeminovoService } from "@/domain/service/seminovoService";
import httpClient from "@/infra/httpClient";
import baseUrl from "@/infra/back-end-connection";
import Spinner from "@/components/common/Spinner";
import { CustomError } from "@/infra/CustomError";
import { useModal } from "@/context/ModalContext"
import { ImagemModel } from "@/domain/models/ImagemModel";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import CheckBoxElement from "../form-components/CheckboxElement";


const CadastrarSeminovo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [output, setOutput] = useState(null)
  const { openModal } = useModal()

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<SeminovoForm>({
    resolver: zodResolver(seminovoSchema),
    defaultValues:{
      oportunidade:false
    }
  })



  const submit = async (data: any) => {
    setIsLoading(true)
    
    const seminovoService = new SeminovoService()
    const imagemModel = new ImagemModel()
    let seminovoFinalData

    try {
      seminovoFinalData = await seminovoService.prepareForSubmitSeminovo(data, imagemModel.prepareForUploadImageList)
    } catch (error: any) {
      openModal("Erro de cliente", error.message, [{ type: "bg-danger", text: "Ok" }])
      console.error(error)
      setIsLoading(false);
      return;
    }

    try {
      await httpClient.post(`${baseUrl}/barco/seminovo`, seminovoFinalData)

      openModal("Sucesso!", "Barco seminovo cadastrado com sucesso!", [{ type: "bg-primary", text: "Ok" }])
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

    reset()
    setIsLoading(false)
  }



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cadastrar Seminovo" />

      <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <FormCard title="Motorização">
              <div className="mb-4.5 w-full">
                <SelectMotor control={control} errorMessage={errors.modeloMotor?.message} />
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="xl:w-1/4 w-full">
                  <SelectQuantidade control={control} errorMessage={errors.quantidadeMotor?.message} />
                </div>
                <div className="xl:w-1/4 w-full">
                  <InputElement type="number" register={register} registerName="horasMotor" label="Horas" placeholder="Numero de horas" errorMessage={errors.horasMotor?.message} maxLength={6} />
                </div>

                <div className="xl:w-1/4 w-full">
                  <InputElement register={register} registerName="anoMotor" label="Ano" type="number" placeholder="Ano de fabricação" errorMessage={errors.anoMotor?.message} />
                </div>
                <div className="xl:w-1/4 w-full">
                  <InputElement register={register} registerName="potenciaMotor" label="Potência" type="number" placeholder="Potência de cada motor" errorMessage={errors.potenciaMotor?.message} />
                </div>
              </div>
              <div className="mb-4.5 ">
                <TextArea register={register} registerName="observacoesMotor" maxLength={200} label="Observações" placeholder="Comentários sobre o motor. Obrigatório caso o ano do motor seja diferente do ano do barco." errorMessage={errors.observacoesMotor?.message} />
              </div>
            </FormCard>
            <FormCard title="Embarcação">
              <div className="mb-4.5 w-full">
                <SelectModelos control={control} errorMessage={errors.modelo?.message} />
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" xl:w-2/3 w-full">
                  <InputElement register={register} registerName="nome" label="Nome" placeholder="Nome do barco" errorMessage={errors.nome?.message} />
                </div>
                <div className=" xl:w-1/3 w-full">
                  <InputElement register={register} registerName="ano" label="Ano" placeholder="Ano de fabricação" type="number" errorMessage={errors.ano?.message} />
                </div>

              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" xl:w-1/4 w-full">
                  <InputElement register={register} registerName="tamanho" label="Tamanho" placeholder="Tamanho da embarcação em pés" type="number" errorMessage={errors.tamanho?.message} />
                </div>
                <div className=" xl:w-1/4 w-full">
                  <InputElement register={register} registerName="potenciaTotal" label="Potência total" placeholder="Potência total em HP" type="number" errorMessage={errors.potenciaTotal?.message} />
                </div>
                <div className=" xl:w-1/4 w-full">
                  <SelectCombustivel control={control} errorMessage={errors.combustivel?.message} />
                </div>
                <div className=" xl:w-1/4 w-full">
                  <SelectPropulsao control={control} errorMessage={errors.propulsao?.message} />
                </div>
              </div>

            </FormCard>
            <FormCard title="Informações">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="xl:w-1/2 w-full">
                  <SelectMoeda control={control} errorMessage={errors.moeda?.message} />
                </div>
                <div className="xl:w-1/2 w-full">
                  <InputElement register={register} registerName="preco" label="Preço" placeholder="0,00" errorMessage={errors.preco?.message} />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" xl:w-1/3 w-full">
                  <InputElement type="number" register={register} registerName="passageirosCabine" label="Cabines de passageiros" placeholder="Cabines para passageiros" errorMessage={errors.passageirosCabine?.message} />
                </div>
                <div className=" xl:w-1/3 w-full">
                  <InputElement type="number" register={register} registerName="tripulacaoCabine" label="Cabines de tripulação" placeholder="Cabines para tripulação" errorMessage={errors.tripulacaoCabine?.message} />
                </div>
                <div className=" xl:w-1/3 w-full">
                  <InputElement register={register} registerName="procedencia" label="Procedência" placeholder="País de procedência" type="text" errorMessage={errors.procedencia?.message} />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <UploadFotos control={control} errorMessage={errors.imagens?.message} />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <Itens control={control} errorMessage={errors.equipadoCom} />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" w-full">
                  <InputElement register={register} registerName="destaque" label="Destaque" placeholder="Informações de destaque" type="text" errorMessage={errors.destaque?.message} />
                </div>
              </div>
              <div className=" xl:w-2/3 w-full ">
                <InputElement register={register} registerName="video" label="Link de video promocional" placeholder="youtube, vimeo e etc..." errorMessage={errors.video?.message} />
              </div>
              <div className=" xl:w-2/3 w-full mt-6">
                <CheckBoxElement control={control}/>
              </div>
              <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                {
                  isLoading ? <Spinner size={40} /> : (
                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                      Cadastrar seminovo
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

    </DefaultLayout >
  );
};

export default CadastrarSeminovo;
