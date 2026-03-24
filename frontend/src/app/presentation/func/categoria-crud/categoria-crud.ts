import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categoria-crud',
  imports: [CommonModule],
  templateUrl: './categoria-crud.html',
  styleUrl: './categoria-crud.css',
})
export class CategoriaCrud {
  categorias = [
    {
      id: 1,
      nome: 'Notebook'
    },
    {
      id: 2,
      nome: 'Monitor'
    },
    {
      id: 3,
      nome: 'Impressora'
    },
    {
      id: 4,
      nome: 'Teclado'
    },
    {
      id: 5,
      nome: 'Desktop'
    },
    {
      id: 6,
      nome: 'Mouse'
    }
  ];

  novaCat(){
    console.log('insertar nova categoria\n')
  }

  filtrarCat(){
    console.log('filtrar categoria\n')
  }

  editarCat() {
    console.log('editar categoria\n') 
  }

  removerCat() {
    console.log('remover categoria\n')
  }
}
