import baseUrl from "./back-end-connection"
import httpClient from "./httpClient"

export const verifyToken = async (token: string) => {
  return httpClient.get(`${baseUrl}/user`,token)
}