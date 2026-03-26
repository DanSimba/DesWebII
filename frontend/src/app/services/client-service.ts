import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitation } from '../models/solicitation-interface';
import { ClientInterface } from '../models/client-interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
    private apiUrl = 'END-BACKEND';
    private jsonUrl = 'assets/client-ex.json'; //VERSÃO COM JSON (CLIENTE DE EXEMPLO)
    constructor(private http: HttpClient) {}

    getSols(id:string): Observable <Solicitation[]>{ //retorna tds as sols do cliente 
      return this.http.get<Solicitation[]>(`${this.apiUrl}/clients/${id}/sols`);
    }

    //OU

    getClient(id: string): Observable<ClientInterface> { //retorna diretamente o cliente
      //return this.http.get<ClientInterface>(`${this.apiUrl}/clients/${id}`); //VERSÃO QUE BUSCA DO BACK, PARA A SEGUNDA PARTE
      return this.http.get<ClientInterface>(this.jsonUrl);
    }
}
