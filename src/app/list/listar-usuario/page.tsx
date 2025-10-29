'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserTable from "./list-components/UserTable";

const ListarSeminovo = () => {
    return (
        <DefaultLayout>
            <UserTable />
        </DefaultLayout>
    );
}

export default ListarSeminovo;