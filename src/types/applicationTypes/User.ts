export type User = {
    id: number,
    email: string,
    userType: string
}

export type UserUpdatePasswordOnly = {
    id: number,
    senha: string
}