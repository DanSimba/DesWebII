import { Solicitation } from "./solicitation-interface";

export interface ClientInterface {
    id: string;
    nome: string;
    sols: Solicitation[]; //tds as solicitações do cliente
}
