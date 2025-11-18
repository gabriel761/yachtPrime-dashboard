'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProprietarioTable from "./list-components/ProprietarioTable";


const ListarSeminovo = () => {
    return (
        <DefaultLayout>
            <ProprietarioTable/>
        </DefaultLayout>
    );
}

export default ListarSeminovo;