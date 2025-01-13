import axios, { AxiosError } from "axios";
import { CustomError } from "./CustomError";

type ServerErrorResponse = {
    message: string;
};
axios.interceptors.response.use(
    response => response,
    (error: AxiosError<ServerErrorResponse>) => {
        console.log(error)
        if (error.response?.data?.message) {
            throw new CustomError(error.response.data.message, error.response.status);
        }
        if (error.message){
            throw new CustomError(error.message, 500);
        }
        throw new CustomError("Erro desconhecido", error.response?.status || 500);
    }
)



export default axios