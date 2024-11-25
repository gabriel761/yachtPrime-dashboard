'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectModelos from "./form-components/SelectModelos";
import InputElement from "./form-components/InputElement";
import SelectMotor from "./form-components/SelectMotor";
import FormCard from "./form-components/FormCard";
import SelectQuantidade from "./form-components/SelectQuantidade";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextArea from "./form-components/TextArea";
import SelectCombustivel from "./form-components/SelectCombustivel";
import SelectPropulsao from "./form-components/SelectPropulsao";
import SelectMoeda from "./form-components/SelectMoeda";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { SeminovoForm, seminovoSchema } from "@/util/seminovoValidationSchema";
import UploadFotos from "./form-components/UploadFotos";
import Itens from "./form-components/Itens/Itens";


// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };




const FormLayout = () => {
  const [output, setOutput] = useState()
  const { register, handleSubmit, control, formState: { errors } } = useForm<SeminovoForm>({
    resolver: zodResolver(seminovoSchema)
  })

  const submit = (data: any) => {
    data = JSON.stringify(data)
    setOutput(data)
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
                  <InputElement register={register} registerName="ano" label="Ano" placeholder="Ano de fabricação" type="number"  errorMessage={errors.ano?.message}/>
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
                  <InputElement type="number" register={register} registerName="tripulacaoCabine" label="Cabines de tripulação" placeholder="Cabines para tripulação"  errorMessage={errors.tripulacaoCabine?.message} />
                </div>
                <div className=" xl:w-1/3 w-full">
                  <InputElement register={register} registerName="procedencia" label="Procedência" placeholder="País de procedência" type="text" errorMessage={errors.procedencia?.message} />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <UploadFotos control={control} errorMessage={errors.imagens?.message}/>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <Itens control={control}  errorMessage={errors.equipadoCom}/>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" w-full">
                  <InputElement  register={register} registerName="destaque" label="Destaque" placeholder="Informações de destaque" type="text" errorMessage={errors.destaque?.message} />
                </div>
              </div>
              <div className=" xl:w-2/3 w-full ">
                <InputElement  register={register} registerName="video" label="Link de video promocional" placeholder="youtube, vimeo e etc..." errorMessage={errors.video?.message} />
              </div>
              <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Cadastrar seminovo
                </button>
              </div>
              <div className="mt-10 ">
                <pre>{output}</pre>
              </div>
            </FormCard>
          </div>
        </form>


        {/* <!-- Sign In Form --> */}
        {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign In Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5 mt-5 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="taskCheckbox sr-only"
                      />
                      <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                        <span className="text-white opacity-0">
                          <svg
                            className="fill-current"
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <p>Remember me</p>
                  </label>

                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    Forget password?
                  </Link>
                </div>

                
              </div>
            </form>
          </div> */}
      </div>
    </DefaultLayout >
  );
};

export default FormLayout;
