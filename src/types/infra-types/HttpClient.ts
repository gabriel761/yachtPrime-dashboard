export default interface HttpClient{
    get(url:string, token: string): Promise<any>;
    post(url: string, body: any, token: string): Promise<any>;
    put(url: string, body: any, token: string): Promise<any>;
    delete(url: string, body: any, token: string): Promise<any>
}