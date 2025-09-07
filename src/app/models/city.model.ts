export interface City {
    id: number;
    nome: string;
    uf: {
        id: number;
        sigla: string;
        nome: string;
    };
    regiao: {
        id: number;
        sigla: string;
        nome: string;
    };
}