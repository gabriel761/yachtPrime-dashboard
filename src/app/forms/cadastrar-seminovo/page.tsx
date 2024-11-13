'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import SelectModelos from "./form-components/SelectModelos";
import InputElement from "./form-components/InputElement";
import SelectMotor from "./form-components/SelectMotor";
import FormCard from "./form-components/FormCard";
import SelectQuantidade from "./form-components/SelectQuantidade";
import TextArea from "./form-components/TextArea";
import SelectMoeda from "./form-components/SelectMoeda";
import FileUpload from "./form-components/FileUpload";

// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const FormLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cadastrar Seminovo" />

      <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <FormCard title="Motorização">
            <div className="mb-4.5 w-full">
              <SelectMotor />
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="xl:w-1/3 w-full">
                <SelectQuantidade />
              </div>
              <div className="xl:w-1/3 w-full">
                <InputElement label="Horas" type="number" placeholder="Numero de horas" />
              </div>
              <div className="xl:w-1/3 w-full">
                <InputElement label="Ano" type="number" placeholder="Ano de fabricação" />
              </div>
            </div>
            <div className="mb-4.5 ">
              <TextArea label="Observações" placeholder="Comentários sobre o motor. Obrigatório caso o ano do motor seja diferente do ano do barco." />
            </div>
          </FormCard>
          <FormCard title="Embarcação">
            <div className="mb-4.5 w-full">
              {/* <SelectModelos /> */}
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className=" xl:w-2/3 w-full">
                <InputElement label="Nome" placeholder="Nome do barco" />
              </div>
              <div className=" xl:w-1/3 w-full">
                <InputElement label="Ano" placeholder="Ano de fabricação" type="number" />
              </div>

            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className=" xl:w-1/4 w-full">
                <InputElement label="Tamanho" placeholder="Tamanho da embarcação em pés" type="number" />
              </div>
              <div className=" xl:w-1/4 w-full">
                <InputElement label="Potência total" placeholder="Potência total em HP" type="number" />
              </div>
              <div className=" xl:w-1/4 w-full">
                <InputElement label="Combustível" placeholder="Tipo de combustível" type="text" />
              </div>
              <div className=" xl:w-1/4 w-full">
                <InputElement label="Propulsão" placeholder="Tipo de propulsão" type="text" />
              </div>
            </div>

          </FormCard>
          <FormCard title="Informações">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="xl:w-1/2 w-full">
                <SelectMoeda />
              </div>
              <div className="xl:w-1/2 w-full">
                <InputElement label="Preço" placeholder="Preço do barco" />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className=" xl:w-1/3 w-full">
                <InputElement label="Cabines de passageiros" placeholder="Cabines para passageiros" type="text" />
              </div>
              <div className=" xl:w-1/3 w-full">
                <InputElement label="Cabines de tripulação" placeholder="Cabines para tripulação" type="text" />
              </div>
              <div className=" xl:w-1/3 w-full">
                <InputElement label="Procedência" placeholder="País de procedência" type="text" />
              </div>

            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className=" w-full">
                <InputElement label="Destaque" placeholder="Informações de destaque" type="text" />
              </div>
            </div>
            <div className="mb-4.5">
              <TextArea label="Texto promocional" placeholder="Texto promocional para a venda do barco." />
            </div>
            <div className=" xl:w-2/3 w-full">
              <InputElement label="Link de video promocional" placeholder="youtube, vimeo e etc..." />
            </div>
          </FormCard>
        </div>


        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
