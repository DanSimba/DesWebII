import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Solicitation } from '../models/solicitation-interface';
import { ClientInterface } from '../models/client-interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
    private apiUrl = 'END-BACKEND';
    private jsonUrl = 'assets/client-ex.json'; //VERSÃO COM JSON (CLIENTE DE EXEMPLO)
    public sols = signal<Solicitation[]>([]); //para guardar as sols criadas no solicitation-form
    constructor(private http: HttpClient) {}

    getSols(): Observable <Solicitation[]>{ //REWORK: essa função agr retorna a lista sols
      return of(this.sols()); 
    }

    getClient(id: string): Observable<ClientInterface> { //retorna diretamente o cliente
      //return this.http.get<ClientInterface>(`${this.apiUrl}/clients/${id}`); //VERSÃO QUE BUSCA DO BACK, PARA A SEGUNDA PARTE
      return this.http.get<ClientInterface>(this.jsonUrl);
    }

    addSol(newSol: Solicitation) { //adiciona a lista de sols que o cliente criou
      this.sols.update(current => [...current, newSol]);
    }
}
