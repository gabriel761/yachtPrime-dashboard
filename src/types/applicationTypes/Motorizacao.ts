export type Motorizacao = {
    modelo: string;
    quantidade: number;
    potencia: number;
    horas: number;
    ano: number;
    observacoes?: string | null;
}