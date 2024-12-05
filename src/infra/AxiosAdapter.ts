import HttpClient from "@/types/infra-types/HttpClient";
import axios from "./AxiosConfig"

export default class AxiosAdapter implements HttpClient{
    async get(url: string): Promise<any> {
        const response = await axios.get(url)
        return response.data
    }
    async post(url: string, body: any): Promise<any> {
        const response = await axios.post(url, body)
        return response.data
    }
    async put(url: string, body: any): Promise<any> {
        const response = await axios.put(url, body)
        return response.data
    }
    async delete(url: string, body:any ): Promise<any> {
        console.log("Body delete",body)
        const response = await axios.delete(url, {data: body})
        return response.data
    }
}