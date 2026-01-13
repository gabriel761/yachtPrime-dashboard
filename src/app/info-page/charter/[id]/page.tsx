'use client'
import Container from "../../info-page-components/Container";
import HeroSlider from "../charter-components/HeroSlider";
import DataTable from "../charter-components/DataTable";
import TitleAndPrice from "../charter-components/TitleAndPrice";
import ItensDisponiveis from "../charter-components/ItensDisponiveis";
import ItensDeLazer from "../charter-components/ItensDeLazer";
import RoteirosPrefixados from "../charter-components/RoteirosPrefixados";
import Condicoes from "../charter-components/Condicoes";
import { useEffect, useRef, useState } from "react";
import { BarcoCharter } from "@/types/applicationTypes/charter/BarcoCharter";

import { useParams, useRouter } from "next/navigation";
import httpClient from "@/infra/httpClient";
import baseUrl from "@/infra/back-end-connection";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import GalerySection from "../../info-page-components/GalerySection";

const Aluguel = () => {
    const formContainerRef = useRef<HTMLDivElement | null>(null)
    const [sectionTop, setSectionTop] = useState(0)
    const [sectionBottom, setSectionBottom] = useState(0)
    const router = useRouter()
    const [charter, setCharter] = useState<BarcoCharter>()
    const { id } = useParams();
    const idCharter = id;

    useEffect(() => {
        handelFetchDataCharter()
    }, [])


    const handelFetchDataCharter = async () => {
        const result = await httpClient.get(`${baseUrl}/barco/charter/${idCharter}`)
        setCharter(result)
    }

    useEffect(() => {
        if (formContainerRef.current) {
            const top = formContainerRef.current.getClientRects()[0].top + window.scrollY - 19.35
            const bottom = formContainerRef.current.getClientRects()[0].bottom + window.scrollY - 36.05
            setSectionTop(top)
            setSectionBottom(bottom)
        }
    }, [charter])


    if (!charter) {
        return null
    }
    return (
        <DefaultLayout>
            <Container>
                <HeroSlider imagens={charter.imagens} />
                <div className="flex lg:flex-row flex-col">
                    <div className="lg:ml-[50px] lg:w-[50%] w-full">
                        <TitleAndPrice modelo={charter.modelo} ano={charter.ano} preco={charter.preco} />
                        <table className="w-full font-light">
                            <tbody>
                                <tr className="w-full">
                                    <td className="w-[50%] ">Passageiros dia</td>
                                    <td className="w-[50%]">{charter.passageiros.passageiros} + {charter.passageiros.tripulacao}</td>
                                </tr>
                                <tr className="w-full">
                                    <td className="w-[50%] ">Passageiros pernoite</td>
                                    <td className="w-[50%]">{charter.passageiros.passageirosPernoite} + {charter.passageiros.tripulacao}</td>
                                </tr>
                                <tr className="w-full">
                                    <td className="w-[50%] ">Tripulação ou Skipper</td>
                                    <td className="w-[50%]">{charter.tripulacaoSkipper.opcao}</td>
                                </tr>
                                <tr className="w-full">
                                    <td className="w-[50%] ">Tipo de passeio</td>
                                    <td className="w-[50%]">{charter.tipoPasseio.opcao}</td>
                                </tr>
                                <tr className="w-full">
                                    <td className="w-[50%] ">Pet Friendly</td>
                                    <td className="w-[50%]">{charter.petFriendly.opcao}</td>
                                </tr>
                            </tbody>
                        </table>
                        <ItensDisponiveis itensCharter={charter.itensDisponiveis} />
                        {/* <ItensDeLazer /> */}
                        <div className="font-light mt-4">
                            <p>{charter.tripulacaoSkipper.opcao} incluso</p>
                            <p>Consumo  {charter.consumoCombustivel.litrosHora}L/hora - {charter.consumoCombustivel.precoHora.moeda} {charter.consumoCombustivel.precoHora.valor}/hora</p>
                            <p>Hora extra - {charter.horaExtra.moeda} {charter.horaExtra.valor}</p>
                            <p>Aluguel de lancha a motor - {charter.aluguelLancha.moeda} {charter.aluguelLancha.valor} o dia</p>
                        </div>
                        <RoteirosPrefixados roteiros={charter.roteiros} />
                        <Condicoes condicoes={charter.condicoes} />
                        <div className="mt-12">
                            <p>Taxa de Churrasco {charter.taxaChurrasco.preco.moeda} {charter.taxaChurrasco.preco.valor}</p>
                            <p>{charter.taxaChurrasco.mensagem}</p>
                        </div>
                    </div>
                    <GalerySection images={charter.imagens} className="w-full z-40"/>
                </div>
            </Container>
        </DefaultLayout>
    );
}

export default Aluguel;