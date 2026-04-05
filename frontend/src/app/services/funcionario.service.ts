import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';
import { C } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private func : Funcionario[] = [];
  private primeiro = false; 
  private jsonURL = 'assets/func-ex.json';

  constructor(private http : HttpClient){}

  listarTodos() : Observable<Funcionario[]>{
    if(this.primeiro){
      return of(this.func);
    }
    return this.http.get<{ funcionarios : Funcionario[] }>(this.jsonURL).pipe(
      map(ff => ff.funcionarios),tap(
        dados => {
          this.func = dados;
          this.primeiro = true; 
        }
      )
    );
  }


  inserir(funcionario : Funcionario) : void {
    funcionario.id = new Date().getTime();
    this.func.push(funcionario);
  }
  
  atualizar(funcionario : Funcionario) : void {
    this.func.forEach((obj, index, objs) => {
      if (funcionario.id === obj.id){
        objs[index] = funcionario;
      }
    });
  }

  buscarPorId(id : number) : Observable <Funcionario | undefined> {
    return of(this.func.find(f => f.id === id));
  }

  remover(id : number) : void{
    this.func = this.func.filter(f => f.id !== id)
  }
}
