export interface City {
    id: number;
    nome: string;
    estado: {
        id: number;
        sigla: string;
        nome: string;
    };
}