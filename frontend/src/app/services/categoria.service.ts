import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

const LS_CHAVE = "categorias";

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  listarTodos (): Categoria[] {
    const categorias = localStorage[LS_CHAVE];

    return categorias ? JSON.parse(categorias) : [];
  }

  inserir(categoria: Categoria): void {
    const categorias = this.listarTodos();

    categoria.id = new Date().getTime();

    categorias.push(categoria);

    localStorage[LS_CHAVE] = JSON.stringify(categorias);
  }

  buscarPorId(id: number): Categoria | undefined {
    const categorias = this.listarTodos();

    return categorias.find(categoria => categoria.id === id);
  }

  atualizar(categoria: Categoria): void {
    const categorias = this.listarTodos();

    categorias.forEach( (obj, index, objs) => {
      if (categoria.id === obj.id) {
        objs[index] = categoria
      }
    });

    localStorage[LS_CHAVE] = JSON.stringify(categorias);
  }

  remover(id: number): void {
    let categorias = this.listarTodos();

    categorias = categorias.filter(categoria => categoria.id !== id);

    localStorage[LS_CHAVE] = JSON.stringify(categorias);
  }
  
}


