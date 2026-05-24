import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';
import { C } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  // private func : Funcionario[] = [];
  // private primeiro = false; 
  // private jsonURL = 'assets/func-ex.json';

  constructor(private http : HttpClient){}
  private readonly apiURL = 'http://localhost:8080/api/funcionarios'

  listarTodos() : Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.apiURL);
  }


  inserir(funcionario : Funcionario) : Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiURL, funcionario);
  }
  
  atualizar(id: number, funcionario : Funcionario) : Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiURL}/${id}`, funcionario);
    
  }

  buscarPorId(id : number) : Observable <Funcionario> {
    return this.http.get<Funcionario>(`${this.apiURL}/${id}`);
  }

  remover(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
