import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';

const LS_CHAVE = "categorias";

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  // private cats : Categoria[] = [];
  // private primeiro = false; //pra saber se é a primeira vez carregando esse json dos infernos 
  // private jsonURL = 'assets/cat-ex.json';
  // se tudo der errado a gente volta aqui 

  constructor(private http : HttpClient){
  }
  private readonly apiURL = 'http://localhost:8080/api/categorias';


  listarTodos (): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURL);
  }

  inserir(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiURL, categoria);
  }

  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiURL}/${id}`);
  }

  atualizar(categoria: Categoria, id : number): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiURL}/${id}`, categoria);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
  
}


