import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoricoItem, Solicitation } from '../models/solicitation-interface';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

export interface OrcamentoPayload {
  valorOrcamento: number;
  est: string; 
}

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  constructor(private http : HttpClient){}

  private readonly apiURL = 'http://localhost:8080/api/solicitations'

  listarTodos(): Observable<Solicitation[]>{
    return this.http.get<Solicitation[]>(this.apiURL);
  }
  
  buscarPorId(id : number): Observable<Solicitation>{
    return this.http.get<Solicitation>(`${this.apiURL}/${id}`);
  } 

  registrarOrcamento(id: number, payload : OrcamentoPayload): Observable<Solicitation>{
    return this.http.put<Solicitation>(`${this.apiURL}/${id}`, payload);
  }

  efetuarManutencao(id:number, orientacao : String): Observable<Solicitation>{
    return this.http.patch<Solicitation>(`${this.apiURL}/${id}/efetuar`, orientacao, {headers:{'Content-Type':'text/plain'}});
  }

  redirecionarManutencao(id: number, idFuncionario: number): Observable<Solicitation>{
    return this.http.patch<Solicitation>(`${this.apiURL}/${id}/redirecionar/${idFuncionario}`, null);    
  }

  finalizarManutencao(id:number): Observable<Solicitation>{
    return this.http.put<Solicitation>(`${this.apiURL}/${id}`, {est: 'FINALIZADA'});
  }

  buscarHistorico(id:number) : Observable<HistoricoItem[]>{
    return this.http.get<HistoricoItem[]>(`${this.apiURL}/${id}/historico`);

  }

}
