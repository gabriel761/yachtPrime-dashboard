import { MouseEvent, useState } from "react";
import { Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import UsersTable from "./UsersTable";
import { User } from "@/types/applicationTypes/User";
import UserSelect from "./UserSelect";


type props = {
    control: any,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ nome: string; moeda: string; preco: string; descricao: string; detalhesPagamento: string; }>> | undefined)[]> | undefined | { message: string }
}


const Users = ({ control, errorMessage }: props) => {
    const [users, setUsers] = useState<User[]>([])


    const syncControlerValueWithState = (value: User[]) => {
        console.log("controller field value:", value)
        setUsers(value)
    }

    const addUserToTable = (userFromTableJSON: string, updateControllerValue: Function) => {
        const userFromTable = JSON.parse(userFromTableJSON)
        const checkRepeatedUser = users.find((user) => {
            return user.id == userFromTable.id
        })
        if (checkRepeatedUser) {
            return
        }
        const newUsersTable = [...users, userFromTable]
        updateControllerValue(newUsersTable)
        setUsers(newUsersTable)
        return true
    }

    const handleDeleteUser = (event: MouseEvent<HTMLButtonElement, MouseEvent>, id: number, updateControllerValue: Function) => {
        event.preventDefault()
        const newUsersTable = users.filter((user) => user.id != id)
        updateControllerValue(newUsersTable)
        setUsers(newUsersTable)
    }



    return (
        <Controller
            name="usuarios"
            defaultValue={[]}
            control={control}
            render={({ field }) => (
                <div className="border-red">
                    <div className="mb-5">
                        <UserSelect
                            errorMessage={errorMessage?.message}
                            addItemToTable={(value: string) => addUserToTable(value, field.onChange)}
                        />
                    </div>
                    <UsersTable
                        controlValue={field.value}
                        syncControlerValueWithState={() => syncControlerValueWithState(field.value)}
                        errorMessage={typeof errorMessage != "string" ? errorMessage : {}}
                        users={users}
                        handleDeleteRoteiro={(event: MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => handleDeleteUser(event, id, field.onChange)}
                    />
                    <p className="text-danger">{errorMessage?.message}</p>
                </div>
            )}
        />
    );
}

export default Users;