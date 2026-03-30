import { Injectable, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs'; //vai inscrever a viewSol na função get solId
import { Solicitation } from '../models/solicitation-interface';

@Injectable({
  providedIn: 'root',
})
export class ClientSolicitationService{
  //private apiUrl = 'END-BACKEND';
  private jsonUrl = 'assets/client-ex.json';
  constructor(private http: HttpClient) {};

    private sol = computed<Solicitation>(() => ({
      id: "001",
      equipamento: "tv",
      dataHora: "22/02/2222",
      estado: "orcada",
      desc: "desc linda",
    }));

  public getSol(): Observable<Solicitation>{
    return of(this.sol());
  }
}
