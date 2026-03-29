import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //vai inscrever a viewSol na função get solId

@Injectable({
  providedIn: 'root',
})
export class ClientSolicitationService{
  //private apiUrl = 'END-BACKEND';
  private jsonUrl = 'assets/client-ex.json';
  constructor(private http: HttpClient) {}

}
