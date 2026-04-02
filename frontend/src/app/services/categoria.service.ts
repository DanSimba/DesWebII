import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';

const LS_CHAVE = "categorias";

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private cats : Categoria[] = [];
  private primeiro = false; //pra saber se é a primeira vez carregando esse json dos infernos 
  private jsonURL = 'assets/cat-ex.json';

  constructor(private http : HttpClient){
  }


  listarTodos (): Observable<Categoria[]> {
    if(this.primeiro){
      return of(this.cats)
    }

    return this.http.get<{ cats: Categoria[] }>(this.jsonURL).pipe(
      map(db => db.cats),tap(
        dados => {
          this.cats = dados;
          this.primeiro = true; 

        }
      )
    );
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
    this.cats = this.cats.filter(ct => ct.id !== id);
  }
  
}


