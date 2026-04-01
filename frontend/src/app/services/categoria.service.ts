import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

const LS_CHAVE = "categorias";

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private cats : Categoria[] = [];
  private jsonURL = 'assets/cat-ex.json';

  constructor(private http : HttpClient){
    this.carregarJSON();
  }

  private carregarJSON() : void { //private pra saber q só tem uma instância dessa budega
    this.http.get<{ cats: Categoria[] }>(this.jsonURL).pipe(
      map(db => db.cats)
    ).subscribe(dados => {
      this.cats = dados;
    });
  }




  listarTodos (): Observable<Categoria[]> {
    return of(this.cats);
  }

  inserir(categoria: Categoria): void {
    categoria.id = new Date().getTime();
    this.cats.push(categoria);
  }

  buscarPorId(id: number): Observable< Categoria | undefined > {
    return of(this.cats.find(c => c.id === id));
  }

  atualizar(categoria: Categoria): void {
    this.cats.forEach( (obj, index, objs) => {
      if (categoria.id === obj.id) {
        objs[index] = categoria
      }
    });

  }

  remover(id: number): void {
    this.cats.filter(cats => cats.id !== id);
  }
  
}


