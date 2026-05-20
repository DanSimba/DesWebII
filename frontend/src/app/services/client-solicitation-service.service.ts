import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //vai inscrever a viewSol na função get solId
import { Solicitation } from '../models/solicitation-interface';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ClientSolicitationService{
  private apiUrl = 'http://localhost:8080';
  //private jsonUrl = 'assets/client-ex.json';
  public sol = signal<Solicitation|null>(null);
  constructor(private http: HttpClient) {};

  public solObs = toObservable(this.sol);
  public getSol(): Observable<Solicitation|null>{
    return this.solObs;
  }

  setSol(newSol: Solicitation) { //adiciona a lista de sols que o cliente criou
    //console.log("sol que chegou no service: ",newSol);
    this.sol.set(newSol);
  }

  updtEst(newEst: String, id: number){
    return this.http.patch(`${this.apiUrl}/solicitations/${id}/mudar`, newEst);
  }
}
