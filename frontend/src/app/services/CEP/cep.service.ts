import { Injectable } from "@angular/core";
import { CepType } from "./cep.type";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({providedIn:'root'})
export class CepService {
    cepResponse: CepType = {
        CEP: '',
        Logradouro: '',
        UF: '',
        Bairro: '',
        Complemento: ''
    }
    constructor(private readonly httpClient: HttpClient){}

    getCep(cep: String){
        return this.httpClient
            .get<CepType>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(map((response)=>{
            this.cepResponse = response;
            return this.cepResponse;
        }))
    }
}