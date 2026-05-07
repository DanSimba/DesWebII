import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Solicitation } from '../models/solicitation-interface';
import { ClientInterface } from '../models/client-interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
    private apiUrl = 'http://localhost:8080/client';
    // private jsonUrl = 'assets/client-ex.json'; //VERSÃO COM JSON (CLIENTE DE EXEMPLO)
    public sols = signal<Solicitation[]>([]); //para guardar as sols criadas no solicitation-form
    constructor(private http: HttpClient) {}

    getSols(): Observable <Solicitation[]>{ //REWORK: essa função agr retorna a lista sols
      return this.http.get<Solicitation[]>(`http://localhost:8080/client/{id}`);
    }

    getClient(id: string): Observable<ClientInterface> { //retorna diretamente o cliente
      return this.http.get<ClientInterface>(`${this.apiUrl}/clients/${id}`); //VERSÃO QUE BUSCA DO BACK, PARA A SEGUNDA PARTE
      // return this.http.get<ClientInterface>(this.jsonUrl);
    }

    addSol(newSol: Solicitation) : Observable<Solicitation>{
      return this.http.post<Solicitation>('http://localhost:8080/api/solicitations', newSol);
       //adiciona a lista de sols que o cliente criou
    }

    getSolById(id: string): Observable<Solicitation> {
      return this.http.get<Solicitation>(`http://localhost:8080/api/solicitations/${id}`);
    }
}
