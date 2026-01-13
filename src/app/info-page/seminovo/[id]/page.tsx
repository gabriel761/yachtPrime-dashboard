'use client'
import Container from "../../info-page-components/Container";
import ImageSlider from "../seminovo-components/ImageSlider";
import GalerySection from "../seminovo-components/GalerySection";
import DadosBarco from "../seminovo-components/DadosBarco";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarcoSeminovoOutput } from "@/types/applicationTypes/seminovo/BarcoSeminovo";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import httpClient from "@/infra/httpClient";
import baseUrl from "@/infra/back-end-connection";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



const BarcoSeminovo = () => {
    const router = useRouter()
    const [seminovoData, setSeminovoData] = useState<BarcoSeminovoOutput>()
    const { id } = useParams();
    const idSeminovo = typeof id == "string" ? id : undefined;

    useEffect(() => {
        handelFetchDataSeminovos()
    }, [])


    const handelFetchDataSeminovos = async () => {
        const result = await httpClient.get(`${baseUrl}/barco/seminovo/${idSeminovo}`)
        setSeminovoData(result)
    }

    const generateEquipadoComText = (itens: ItemSeminovo[]) => {
        const itensTextArray = itens.map((item) => {
            return `${item.quantidade} ${item.item}`
        })
        const itensText = itensTextArray.join(', ')
        return itensText
    }
    if (!seminovoData) return null
    return (
        <DefaultLayout>
            <Container>
                <ImageSlider imagens={seminovoData?.imagens} />
                <div className="flex gap-10 flex-col-reverse md:flex-row">
                    <GalerySection images={seminovoData?.imagens} className="flex-1 " />
                    <div className="flex-1">
                        <h1 className="font-title text-3xl mb-6">{seminovoData?.modelo}</h1>
                        <DadosBarco dataSeminovo={seminovoData} />
                    </div>
                </div>
                <div className="mt-10 ">
                    <h3 className="font-bold text-xl mb-3">Equipado com:</h3>
                    <p className="font-light text-lg">{generateEquipadoComText(seminovoData.equipadoCom)}</p>
                </div>
            </Container>
        </DefaultLayout>
    );
}

export default BarcoSeminovo;